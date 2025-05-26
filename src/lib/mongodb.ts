// MongoDB холболтын тохиргоо
import mongoose from "mongoose";

// Global-д cached холболт хадгалах структур
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global объектыг өргөтгөх
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

// MongoDB холболтын string-ийг environment variable-аас авна
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB холболтын төлвийг хадгалах глобал өөрчлөгч
let cached = global.mongoose;

// Хэрэв глобал дээр cached байхгүй бол шинээр үүсгэнэ
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * MongoDB-тай холбогдох функц
 * Энэ функц нь singleton pattern ашиглаж,
 * нэг удаа л холбогдож, дараагийн удаа дуудахад кэш ашиглана
 */
export async function connectToDatabase() {
  // cached нь байна гэж guaranteed учир null check хийж байна
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  // Хэрэв аль хэдийн холбогдсон байвал кэшээс буцаана
  if (cached.conn) {
    console.log("🔄 MongoDB: Кэшээс холболт ашиглаж байна");
    return cached.conn;
  }

  // MongoDB URI байгаа эсэхийг шалгана
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable байхгүй байна. .env.local файлд нэмнэ үү!"
    );
  }

  // Хэрэв promise үүссэнгүй бол шинээр үүсгэнэ
  if (!cached.promise) {
    console.log("🔌 MongoDB-тай холбогдож байна...");

    // Mongoose тохиргооны сонголтууд
    const opts = {
      bufferCommands: false, // Холболт хүлээлгүйгээр команд илгээхгүй
      serverSelectionTimeoutMS: 5000, // 5 секундийн дотор сервер олох
      socketTimeoutMS: 45000, // 45 секундийн socket timeout
      family: 4, // IPv4 ашиглах
    };

    // MongoDB-тай холбогдох promise үүсгэнэ
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB амжилттай холбогдлоо!");
      return mongoose;
    });
  }

  try {
    // Promise-г хүлээж, холболтыг cached-д хадгална
    cached.conn = await cached.promise;
  } catch (e) {
    // Алдаа гарвал promise-г цэвэрлэнэ
    cached.promise = null;
    console.error("❌ MongoDB холболтод алдаа:", e);
    throw e;
  }

  return cached.conn;
}

/**
 * MongoDB холболтыг таслах функц
 * Ихэвчлэн production-д ашиглагддаггүй
 */
export async function disconnectFromDatabase() {
  if (!cached) {
    return;
  }

  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 MongoDB холболт таслагдлаа");
  }
}
