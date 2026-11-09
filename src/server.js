import express from "express";

import userRoutes from "./routes/api/userRoutes.js"

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
