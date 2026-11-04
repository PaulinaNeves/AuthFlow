import pool from "../config/database.js";

export const getUsers = async (req, res)=>{
    
    const user = await pool.query("SELECT * FROM users");
}; 