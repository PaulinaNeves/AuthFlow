import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.json());

pool.query("SELECT NOW()")
    .then(result => {
        console.log("PostgreSQL conectado!");
        console.log(result.rows[0]);
    })
    .catch(error => {
        console.error("Erro na conexão:", error.message);
    });

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

/* import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.port || 3001;

// Middleware

app.use(express.json());
app.use(cors);
app.listen(port, ()=> console.log(`server is running ${port}`))
/* 
app.listen(port, (req, res) => {res.send(`server is running on ${port} port`)});
 */ 