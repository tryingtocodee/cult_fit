//package imports
import express from "express"
import sequelize from "./db/models/sequelize"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
 
//file imports
import authRoutes from "./routes/authRoutes"



dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/user" , authRoutes)

app.listen(4000 , async ()=>{
    await sequelize.authenticate().then(()=>console.log("connected to db "))
    console.log("server started at port" , port )
})