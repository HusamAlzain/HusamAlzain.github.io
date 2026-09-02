import fs from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey";

  try {
    jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const portfolioData = join(process.cwd(), "/data/portfolio.json");
  if (req.method === "POST") {
    try {
      fs.writeFileSync(
        portfolioData,
        JSON.stringify(req.body, null, 2),
        "utf-8"
      );
      res.status(200).json({ message: "Portfolio updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update portfolio" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
