import express from "express"
import sequelize from "./db/models/sequelize"

const app = express()

const port = 4000

app.listen(4000 , async ()=>{
    await sequelize.authenticate().then(()=>console.log("connected to db "))
})