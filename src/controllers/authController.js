import pool from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    console.log("Body recebido:", req.body);
    console.log("Chaves recebidas:", Object.keys(req.body));
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const dbInfo = await pool.query(`
  SELECT current_database() AS database,
         current_schema() AS schema
`);
    const user = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password_hash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: " Success. Welcomme back!", token: token });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong during login!",
        erro: error.message,
      });
  }
};
