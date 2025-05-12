import {Model , InferAttributes , InferCreationAttributes , CreationOptional, ForeignKey, DataTypes} from "sequelize"
import sequelize from "./sequelize"

type Banned_User =  {
    userId : number ,
    banned_start_date : Date ,
    banned_end_date : Date ,
    reason : "3 classes not attended consiquetly" | ""
}

type Holiday  = {
    holiday_on : Date
}

type Assets = {
    imageId : string ,
    imageUrl : string ,
    videoUrl? : string,
    videoId? : string
}

type DatesOpen = {
    open_date : Date
}

type DatesClosed = {
    close_date : Date
}


class Gym extends Model <InferAttributes<Gym>  , InferCreationAttributes<Gym>> {
    declare gymId : CreationOptional<number> 
    declare owner? :   ForeignKey<number>
    declare gym_name : string
    declare gym_address : string
    declare open_time : Date 
    declare close_time : Date 
    declare banned_users? : Banned_User[]
    declare holidays? : Holiday[]
    declare assets : Assets[]
    declare dates_open : DatesOpen[]
    declare dates_close : DatesClosed[]
}

Gym.init({
    gymId : {type : "INTEGER" , autoIncrement : true , primaryKey : true},
    owner : {type :"INTEGER" , references : {model : "User" , key : "id"} },
    gym_name : {type : "STRING" , allowNull : false} ,
    gym_address : {type : "STRING" , allowNull :false , unique : true},
    dates_open : {type : DataTypes.DATE , allowNull : false , } , 
    open_time : {type : DataTypes.JSON , allowNull :false , defaultValue : []},
    close_time : {type : DataTypes.TIME , allowNull : false} ,
    banned_users : {type : DataTypes.JSON , defaultValue : []} ,
    holidays : {type : DataTypes.JSON , defaultValue : []},
    assets : {type :DataTypes.JSON , defaultValue : []} ,
    dates_close : {type :DataTypes.JSON , defaultValue : []}
},{
    tableName : "Gym",
    sequelize : sequelize,
    underscored : true,
    timestamps : true
})

export default Gym

//todo create migration file 