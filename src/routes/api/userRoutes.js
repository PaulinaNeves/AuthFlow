import express from "express";

import { destroy, getUsers, getUserById, insertUser, editUser} from "../../controllers/usersController.js";

const router = express.Router();

//users routes

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", destroy);
router.put("/users", insertUser);
router.put("/users/:id", editUser);


export default router;