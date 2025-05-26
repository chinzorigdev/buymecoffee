import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import { User, IUser } from "@/models/User";

export const authOptions: NextAuthOptions = {
  pages: {
    error: "/auth/error", // Custom error page
    signIn: "/signin",
    signOut: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
        isSignup: { label: "Is Signup", type: "text" }, // Бүртгэл эсэх тодорхойлох
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Имэйл эсвэл нууц үг байхгүй");
          return null;
        }

        try {
          // MongoDB-тай холбогдох
          await connectToDatabase();

          const isSignup = credentials.isSignup === "true";

          if (isSignup) {
            // БҮРТГЭЛ: Шинэ хэрэглэгч үүсгэх
            console.log("📝 Шинэ хэрэглэгч бүртгэж байна:", credentials.email);

            // Имэйл давхцаж байгаа эсэхийг шалгах
            const existingUser = await User.findByEmail(credentials.email);
            if (existingUser) {
              console.log(
                "❌ Имэйл аль хэдийн бүртгэгдсэн:",
                credentials.email
              );
              throw new Error("Энэ имэйл хаягаар аль хэдийн бүртгэлтэй байна");
            }

            // Username давхцаж байгаа эсэхийг шалгах
            if (credentials.username) {
              const existingUsername = await User.findByUsername(
                credentials.username
              );
              if (existingUsername) {
                console.log(
                  "❌ Username аль хэдийн бүртгэгдсэн:",
                  credentials.username
                );
                throw new Error(
                  "Энэ хэрэглэгчийн нэр аль хэдийн ашиглагдаж байна"
                );
              }
            }

            // Username үүсгэх эсвэл ашиглах
            const username =
              credentials.username ||
              credentials.email
                .split("@")[0]
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");

            // Шинэ хэрэглэгч үүсгэх
            const newUser = new User({
              email: credentials.email,
              password: credentials.password, // Pre-save middleware нь hash хийнэ
              username: username,
              name: credentials.username || username,
              providers: ["credentials"],
            });

            const savedUser = await newUser.save();
            console.log(
              "✅ Шинэ хэрэглэгч амжилттай үүсгэгдлээ:",
              savedUser.email
            );

            return {
              id: savedUser._id.toString(),
              email: savedUser.email,
              name: savedUser.name,
              username: savedUser.username,
              image: savedUser.profileImage,
            };
          } else {
            // НЭВТРЭХ: Одоо байгаа хэрэглэгчийг шалгах
            console.log("🔐 Хэрэглэгч нэвтэрч байна:", credentials.email);

            // Хэрэглэгчийг олох (password орууллт шаардлагатай)
            const user = await User.findOne({
              email: credentials.email,
            }).select("+password");

            if (!user) {
              console.log("❌ Хэрэглэгч олдсонгүй:", credentials.email);
              return null;
            }

            // Нууц үг шалгах
            const isValidPassword = await user.comparePassword(
              credentials.password
            );
            if (!isValidPassword) {
              console.log("❌ Нууц үг буруу:", credentials.email);
              return null;
            }

            // Сүүлийн нэвтрэх огноог шинэчлэх
            await user.updateLastLogin();

            console.log("✅ Амжилттай нэвтэрлээ:", user.email);

            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              username: user.username,
              image: user.profileImage,
            };
          }
        } catch (error) {
          console.error("💥 Authorize алдаа:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isNewUser = user.isNewUser || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.isNewUser = token.isNewUser as boolean;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();

        if (account?.provider === "google") {
          console.log("🔍 Google OAuth нэвтрэлт:", profile?.email); // Google ID ашиглан хэрэглэгч хайх
          let existingUser = (await User.findOne({
            googleId: user.id,
          })) as IUser | null;

          let isNewUser = false;

          if (!existingUser) {
            // Имэйлээр хайх (Google account-г одоо байгаа account-тай холбох)
            existingUser = (await User.findByEmail(
              user.email!
            )) as IUser | null;

            if (existingUser) {
              // Одоо байгаа аккаунтад Google provider нэмэх
              console.log("🔗 Google-г одоо байгаа аккаунттай холбож байна");
              existingUser.googleId = user.id;
              if (!existingUser.providers.includes("google")) {
                existingUser.providers.push("google");
              }
              // Профайл зургийг шинэчлэх (хэрэв байхгүй бол)
              if (!existingUser.profileImage && user.image) {
                existingUser.profileImage = user.image;
              }
              await existingUser.save();
            } else {
              // Шинэ Google хэрэглэгч үүсгэх
              console.log("👤 Шинэ Google хэрэглэгч үүсгэж байна");
              isNewUser = true;

              // Username үүсгэх - Сайжруулсан логик
              let username = generateUsernameFromEmail(user.email!);

              // Username давхцажгүй байхыг шалгах
              username = await ensureUniqueUsername(username);

              existingUser = new User({
                email: user.email,
                name: user.name,
                username: username,
                profileImage: user.image,
                googleId: user.id,
                providers: ["google"],
                isVerified: true, // Google аккаунт автоматаар баталгаажсан
                // Шинэ хэрэглэгчид complete-your-page руу шилжүүлэхийг тэмдэглэх
                needsProfileCompletion: true,
              });

              await existingUser.save();
              console.log(
                "✅ Шинэ Google хэрэглэгч үүсгэгдлээ:",
                existingUser.email
              );
            }
          }

          // Сүүлийн нэвтрэх огноог шинэчлэх
          await existingUser.updateLastLogin();

          // User объектод MongoDB-ийн мэдээллийг нэмэх
          user.id = existingUser._id.toString();
          user.username = existingUser.username;
          user.name = existingUser.name;

          // Шинэ хэрэглэгч эсэхийг тэмдэглэх
          user.isNewUser = isNewUser;

          return true;
        }

        // Бусад provider-үүд (Facebook, Twitter)
        if (account?.provider === "facebook") {
          // Facebook логик (ижил зарчмаар)
          console.log("📘 Facebook OAuth нэвтрэлт");
          // TODO: Facebook provider логик нэмэх
        }

        return true;
      } catch (error) {
        console.error("💥 SignIn callback алдаа:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // OAuth-аас ирсэн redirect-ийг зохицуулах
      console.log("🔄 Redirect callback:", { url, baseUrl });

      // Хэрэв complete-your-page хуудаснаас ирсэн бол, тухайн хуудсанд үлдэх
      if (url.includes("complete-your-page")) {
        return `${baseUrl}/complete-your-page`;
      }

      // Хэрэв signin хуудаснаас ирсэн бол:
      // - Шинэ Google хэрэглэгчид complete-your-page руу
      // - Одоо байгаа хэрэглэгчид dashboard руу
      if (url.includes("signin")) {
        // URL-д callbackUrl байгаа эсэхийг шалгах
        const urlObj = new URL(url, baseUrl);
        const callbackUrl = urlObj.searchParams.get("callbackUrl");

        if (callbackUrl && callbackUrl.includes("complete-your-page")) {
          return `${baseUrl}/complete-your-page`;
        }

        // Google OAuth-н хувьд session-аас шинэ хэрэглэгч эсэхийг шалгах
        // (Энэ нь JWT callback дээр тохируулагдсан байх ёстой)
        return `${baseUrl}/dashboard`;
      }

      // Dashboard хандалт - шинэ хэрэглэгчид complete-your-page руу шилжүүлэх
      if (url.includes("dashboard")) {
        return `${baseUrl}/dashboard`;
      }

      // Үндсэн хуудас руу буцах
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;

      // Default: Dashboard руу шилжүүлэх
      return `${baseUrl}/dashboard`;
    },
  },
};

// Helper functions - Enhanced Username Generation
function generateUsernameFromEmail(email: string): string {
  const localPart = email.split("@")[0];

  // 1. Clean and normalize the local part
  let username = localPart
    .toLowerCase()
    .trim()
    // Remove dots and plus signs (common in emails)
    .replace(/[\.+]/g, "")
    // Replace non-alphanumeric characters with underscores
    .replace(/[^a-z0-9]/g, "_")
    // Remove consecutive underscores
    .replace(/_+/g, "_")
    // Remove leading/trailing underscores
    .replace(/^_+|_+$/g, "");

  // 2. Handle edge cases
  if (!username || username.length < 3) {
    // Generate readable random username if email local part is too short
    const adjectives = [
      "cool",
      "smart",
      "happy",
      "bright",
      "quick",
      "nice",
      "swift",
      "bold",
    ];
    const nouns = [
      "user",
      "creator",
      "maker",
      "builder",
      "artist",
      "writer",
      "coder",
      "dreamer",
    ];

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 99) + 1;

    username = `${randomAdjective}_${randomNoun}_${randomNum}`;
  }

  // 3. Ensure reasonable length (3-20 characters)
  if (username.length > 20) {
    // Truncate but try to keep it readable
    username = username.substring(0, 17) + Math.floor(Math.random() * 100);
  }

  // 4. Ensure it doesn't end with underscore
  username = username.replace(/_+$/, "");

  // 5. Final fallback
  if (username.length < 3) {
    username = "user_" + Math.random().toString(36).substring(2, 8);
  }

  return username;
}

async function ensureUniqueUsername(baseUsername: string): Promise<string> {
  let username = baseUsername;
  let counter = 1;

  // First, check if the base username is available
  if (!(await User.findByUsername(username))) {
    return username;
  }

  // Try different variations to make it unique
  while (await User.findByUsername(username)) {
    if (counter === 1) {
      // First attempt: add random suffix
      const randomSuffix = Math.random().toString(36).substring(2, 4);
      username = `${baseUsername}_${randomSuffix}`;
    } else if (counter <= 10) {
      // Next attempts: add incremental numbers
      username = `${baseUsername}_${counter}`;
    } else {
      // After 10 attempts: use timestamp-based unique name
      const timestamp = Date.now().toString(36);
      username = `${baseUsername.substring(0, 10)}_${timestamp}`;
      break;
    }

    counter++;

    // Safety net to prevent infinite loops
    if (counter > 50) {
      username = `user_${Date.now().toString(36)}_${Math.random()
        .toString(36)
        .substring(2, 4)}`;
      break;
    }
  }

  return username;
}
