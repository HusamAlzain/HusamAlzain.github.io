import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// In-memory store for rate limiting
// WARNING: This is volatile and will reset on server restart or serverless function execution.
// For production, use Redis or a database.
const rateLimitData = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userData = rateLimitData[email] || { attempts: 0, lockedUntil: null };
  const now = Date.now();

  if (userData.lockedUntil && now < userData.lockedUntil) {
    const remainingTime = Math.ceil((userData.lockedUntil - now) / 60000);
    return res.status(429).json({ message: `Too many failed attempts. Try again in ${remainingTime} minutes.` });
  }

  // Use environment variables or fallback values for local testing
  const validEmail = process.env.ADMIN_EMAIL || "husam1551@gmail.com";
  const validPassword = process.env.ADMIN_PASSWORD || "GoingHome__GG101!";
  const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey";

  if (email === validEmail && password === validPassword) {
    // Reset attempts on successful login
    delete rateLimitData[email];

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
    const serializedCookie = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);
    return res.status(200).json({ message: "Login successful" });
  } else {
    userData.attempts += 1;
    if (userData.attempts >= MAX_ATTEMPTS) {
      userData.lockedUntil = now + LOCKOUT_TIME;
    }
    rateLimitData[email] = userData;

    if (userData.lockedUntil) {
      return res.status(429).json({ message: `Too many failed attempts. Try again in 30 minutes.` });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }
}
