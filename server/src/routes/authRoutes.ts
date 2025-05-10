import express from "express"

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.put("/update" , updateUser)
router.delete("delete" , deleteUser)
router.get("/get-user" , getUser)


export default router