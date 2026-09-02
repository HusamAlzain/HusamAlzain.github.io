import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const serializedCookie = serialize("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  res.setHeader("Set-Cookie", serializedCookie);
  res.status(200).json({ message: "Logout successful" });
}
