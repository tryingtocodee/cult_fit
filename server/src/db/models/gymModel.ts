import {Model , InferAttributes , InferCreationAttributes , CreationOptional, ForeignKey, DataTypes} from "sequelize"
import sequelize from "./sequelize"

type Banned_User =  {
    userId : number ,
    banned_start_date : Date ,
    banned_end_date : Date ,
    reason : "3 classes not attended consiquetly" | ""
}

type Holiday  = {
    holiday_on : number
}



class Gym extends Model <InferAttributes<Gym>  , InferCreationAttributes<Gym>> {
    declare gymId : CreationOptional<number> 
    declare owner :   ForeignKey<number>
    declare open_time : Date 
    declare close_time : Date 
    declare banned_users : Banned_User[]
    declare holidays : Holiday[]
}

Gym.init({
    gymId : {type : "INTEGER" , autoIncrement : true , primaryKey : true},
    owner : {type :"INTEGER" , references : {model : "User" , key : "id"} },
    open_time : {type : "INTEGER" , defaultValue : null},
    close_time : {type : "INTEGER" , defaultValue : null} ,
    banned_users : {type : DataTypes.JSON , defaultValue : []} ,
    holidays : {type : DataTypes.JSON , defaultValue : []}
},{
    tableName : "Gym",
    sequelize : sequelize,
    underscored : true,
    timestamps : true
})


//todo create migration file 