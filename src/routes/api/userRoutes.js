import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";


import { destroy, getUsers, getUserById, insertUser, editUser} from "../../controllers/usersController.js";
import {login} from "../../controllers/authController.js";

const router = express.Router();

//Login
router.post("/login/users", login)

//users routes

router.get("/users", verifyToken, getUsers);
router.get("/users/:id",verifyToken, getUserById);
router.delete("/users/:id",verifyToken, destroy);
router.post("/users", insertUser);
router.put("/users/:id", verifyToken, editUser);


export default router;