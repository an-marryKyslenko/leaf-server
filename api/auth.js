import express from "express";
import { deleteUser, login, register, updateUser } from "../controllers/auth.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.route('/:userId').patch(updateUser).delete(deleteUser)

export default router;