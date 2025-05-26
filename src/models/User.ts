// Хэрэглэгчийн мэдээллийг хадгалах Mongoose схем
import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Хэрэглэгчийн интерфейс - TypeScript-ийн төрөл тодорхойлолт
 */
export interface IUser extends Document {
  _id: string;
  username: string; // Хэрэглэгчийн нэр (unique)
  email: string; // Имэйл хаяг (unique)
  password?: string; // Нууц үг (зөвхөн credentials signin-д)
  name?: string; // Дэлгэцэд харагдах нэр
  about?: string; // Танилцуулга
  website?: string; // Вебсайт линк
  profileImage?: string; // Профайл зургийн URL
  coverImage?: string; // Ковер зургийн URL
  socialLinks?: {
    // Нийгмийн сүлжээний холбоосууд
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };

  // Кофе мэдээлэл
  coffeePrice: number; // Нэг кофе үнэ (төгрөг)
  totalCoffees: number; // Нийт авсан кофе тоо
  totalEarnings: number; // Нийт орлого

  // Аккаунтын төлөв
  isVerified: boolean; // Имэйл баталгаажсан эсэх
  isActive: boolean; // Идэвхтэй эсэх

  // OAuth мэдээлэл
  providers: string[]; // ['credentials', 'google', 'facebook', ...]
  googleId?: string; // Google OAuth ID
  facebookId?: string; // Facebook OAuth ID

  // Огноо мэдээлэл
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;

  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<IUser>;
}

/**
 * User model interface with static methods
 */
export interface IUserModel extends Model<IUser> {
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}

/**
 * Mongoose схем тодорхойлолт
 * MongoDB-д хадгалагдах мэдээллийн бүтцийг тодорхойлно
 */
const UserSchema = new Schema<IUser>(
  {
    // Үндсэн мэдээлэл
    username: {
      type: String,
      required: [true, "Хэрэглэгчийн нэр заавал оруулна уу"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Хэрэглэгчийн нэр 3-аас дээш тэмдэгт байх ёстой"],
      maxlength: [30, "Хэрэглэгчийн нэр 30-аас бага тэмдэгт байх ёстой"],
      match: [
        /^[a-z0-9_.-]+$/,
        "Зөвхөн жижиг үсэг, тоо, доогуур зураас, цэг, зураас ашиглана уу",
      ],
      validate: {
        validator: function(username: string) {
          // Зориглолын түгээмэл нэрсийг хориглох
          const reservedNames = [
            'admin', 'administrator', 'root', 'support', 'help', 'api', 'www',
            'mail', 'email', 'test', 'demo', 'null', 'undefined', 'system',
            'buymecoffee', 'buymeacoffee', 'coffee', 'payment', 'donate'
          ];
          
          // Цэг, зураасаар эхлэх эсвэл төгсөхийг хориглох
          if (username.startsWith('.') || username.startsWith('-') || 
              username.endsWith('.') || username.endsWith('-')) {
            return false;
          }
          
          // Дараалсан тусгай тэмдэгтүүдийг хориглох (.., --, .-, -.)
          if (username.includes('..') || username.includes('--') || 
              username.includes('.-') || username.includes('-.')) {
            return false;
          }
          
          return !reservedNames.includes(username.toLowerCase());
        },
        message: "Энэ хэрэглэгчийн нэрийг ашиглах боломжгүй"
      }
    },

    email: {
      type: String,
      required: [true, "Имэйл хаяг заавал оруулна уу"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Зөв имэйл хаяг оруулна уу"],
    },

    password: {
      type: String,
      // OAuth signin-д password шаардлагагүй тул required: false
      minlength: [6, "Нууц үг 6-аас дээш тэмдэгт байх ёстой"],
      select: false, // Ихэвчлэн query-д password буцаахгүй
    },

    name: {
      type: String,
      trim: true,
      maxlength: [50, "Нэр 50-аас бага тэмдэгт байх ёстой"],
    },

    about: {
      type: String,
      trim: true,
      maxlength: [500, "Танилцуулга 500-аас бага тэмдэгт байх ёстой"],
    },

    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, "Зөв URL оруулна уу (http:// эсвэл https://)"],
    },

    profileImage: {
      type: String,
      default: null,
    },

    coverImage: {
      type: String,
      default: null,
    },

    // Нийгмийн сүлжээ
    socialLinks: {
      twitter: { type: String, trim: true },
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },

    // Кофе мэдээлэл
    coffeePrice: {
      type: Number,
      default: 5000, // Анхдагч үнэ: 5000 төгрөг
      min: [1000, "Кофе үнэ 1000 төгрөгөөс бага байж болохгүй"],
      max: [50000, "Кофе үнэ 50000 төгрөгөөс их байж болохгүй"],
    },

    totalCoffees: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Аккаунтын төлөв
    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // OAuth providers
    providers: [
      {
        type: String,
        enum: ["credentials", "google", "facebook", "twitter"],
      },
    ],

    googleId: {
      type: String,
      sparse: true, // Unique боловч null утга зөвшөөрнө
    },

    facebookId: {
      type: String,
      sparse: true,
    },

    // Огноо
    lastLoginAt: {
      type: Date,
    },
  },
  {
    // Автомат timestamps (createdAt, updatedAt)
    timestamps: true,

    // Virtual fields-ийг JSON-д оруулах
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Index тохиргоо - хайлтыг хурдасгах
 */
// email, username, googleId, facebookId indexes are created automatically by unique/sparse constraints
UserSchema.index({ createdAt: -1 }); // Шинээр бүртгэлийн дарааллаар

/**
 * Virtual field - Профайл URL автоматаар үүсгэх
 */
UserSchema.virtual("profileUrl").get(function () {
  return `/${this.username}`;
});

/**
 * Middleware: Нууц үгийг hash хийх (хадгалахаасаа өмнө)
 */
UserSchema.pre("save", async function (next) {
  // Хэрэв password өөрчлөгдөөгүй бол дараачийн middleware руу шилжинэ
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    // Нууц үгийг bcrypt ашиглан hash хийнэ
    const saltRounds = 12; // Аюулгүй байдлын түвшин
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
 * Instance method: Нууц үг шалгах
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) {
    return false; // OAuth хэрэглэгчид нууц үг байхгүй
  }

  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Нууц үг шалгахад алдаа:", error);
    return false;
  }
};

/**
 * Instance method: Сүүлийн нэвтрэх огноог шинэчлэх
 */
UserSchema.methods.updateLastLogin = async function () {
  this.lastLoginAt = new Date();
  return this.save();
};

/**
 * Static method: Username-ээр хэрэглэгч олох
 */
UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username: username.toLowerCase() });
};

/**
 * Static method: Email-ээр хэрэглэгч олох
 */
UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

/**
 * Model үүсгэх эсвэл одоо байгаагийг ашиглах
 * Next.js-д hot reload-ийн үед model дахин үүсгэхээс сэргийлнэ
 */
export const User: IUserModel =
  (mongoose.models.User as unknown as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", UserSchema);
