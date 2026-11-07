import pool from "../config/database.js";
import bcrypto from "bcryptjs";

//Method index
export const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, created_at FROM users",
    );
    res.status(200).json({ message: "Success", data: users.rows });
  } catch (error) {
    res.status(500).json({
      message: "Sorry, somenthing went wrong while loading users!",
      erro: error.message,
    });
  }
};

//Method show
export const getUserById = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, created_at FROM users Where id= $1",
      [req.params.id],
    );
    if (user.rows.length === 0) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json({ message: "Success", data: user.rows[0] });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sorry, somenthing went wrong while loading this user!",
      erro: error.message,
    });
  }
};

//Method destroy
export const destroy = async (req, res) => {
  try {
    const user = await pool.query("DELETE FROM users WHERE id=$1", [
      req.params.id,
    ]);
    if (user.rowCount === 0) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(200).json({ message: "Success, user deleted" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sorry, somenthing went wrong while deleting this user!",
      erro: error.message,
    });
  }
};

//Method store (Criar registo)

export const insertUser = async (req, res) => {
  try {
    const password = req.body.password;
    const passwordHash = await bcrypto.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [req.body.name, req.body.email, req.body.passwordHash],
    );

    res.status(201).json({ message: "Sucsess", data: user.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Sorry, somenthing went wrong while creating this user!",
        erro: error.message,
      });
  }
};
