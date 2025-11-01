import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // basic presence checks (optional but helpful)
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email and password are required" });
    }

    const already = await User.findOne({ email });
    if (already) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // <- must match schema field name
      role,                     // optional: will default to "user" if not provided
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
