import express from "express"
import { adminRoutes, protectedRoutes } from "../middlewares/protectedRoutes"
import { createCenter, deleteCenter, updateCenter, viewCenter } from "../controller/center-management-controller"

const router = express.Router()

router.use("/create" , protectedRoutes , adminRoutes , createCenter)
router.get("/view"  , protectedRoutes , adminRoutes, viewCenter)
router.put("/update" , protectedRoutes , adminRoutes , updateCenter)
router.delete("/delete" , protectedRoutes , adminRoutes , deleteCenter)



export default router