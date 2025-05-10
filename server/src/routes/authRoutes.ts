import express from "express"
import {deleteUser, getUser, login, signup, updateUser} from "../controller/authController"
import { protectedRoutes } from "../middlewares/protectedRoutes"

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.put("/update" , protectedRoutes , updateUser)
router.delete("/delete", protectedRoutes , deleteUser)
router.get("/get-user" , protectedRoutes , getUser)


export default router