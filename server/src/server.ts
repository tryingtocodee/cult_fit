//package imports
import express from "express"
import sequelize from "./db/models/sequelize"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

//file imports
import authRoutes from "./routes/authRoutes"
import centerRoutes from "./routes/center-management-routes"



dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cookieParser())
app.use(express.json({limit : '20mb'}))
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    methods : ["GET" , "POST"]
}))

app.use("/api/v1/user" , authRoutes) // auth routes tested , working correctly 
app.use("/api/v1/center-routes" , centerRoutes ) // complicated go through logic twice and test twice 

app.listen(4000 , async ()=>{
    await sequelize.authenticate().then(()=>console.log("connected to db "))
    console.log("server started at port" , port )
})