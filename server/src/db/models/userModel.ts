import { Model , InferAttributes , InferCreationAttributes , CreationOptional, DataTypes } from "sequelize";
import sequelize from "./sequelize";


class User extends Model<InferAttributes<User> , InferCreationAttributes<User> > {
    declare id : CreationOptional<number> ;
    declare username : string ;
    declare email : string ;
    declare password : string ;
    declare phoneNumber? : number ;
    declare strike_count? : number ;
    declare no_show? : number ;
    declare number_of_no_shows_stricks? : number ;
    declare banned_until? : Date ;
    declare type : "user" | "admin" ;
}

User.init({
    id : {type : "INTEGER" , autoIncrement : true , primaryKey : true},
    username : {type : "STRING" , allowNull : false} ,
    email : {type : "STRING" , allowNull : false , unique : true} ,
    password : {type : "STRING" , allowNull : false},
    phoneNumber : {type : "INTEGER" , defaultValue : null},
    strike_count : {type : "INTEGER" , defaultValue : null} ,
    no_show : {type : "INTEGER" , defaultValue : null} ,
    number_of_no_shows_stricks : {type : "Date" , defaultValue : null},
    banned_until : {type : "DATE" , defaultValue : null} ,
    type : {type : DataTypes.ENUM("user" , "admin") , defaultValue : "user"}
} ,{
    tableName : "User",
    sequelize : sequelize,
    underscored : true,
    timestamps : true
})

export default User



//update user migration file 