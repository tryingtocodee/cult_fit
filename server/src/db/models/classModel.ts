import {Model , InferAttributes , InferCreationAttributes , ForeignKey , CreationOptional, DataTypes} from "sequelize"
import sequelize from "./sequelize"


type Active_Class = {
    type : "single" | "recurring"  ,
    class_on_date : Date ,
    class_start_on : number ,
    class_end_on : number ,
    cancelled : boolean , // if admin cancels the class 
    capacity : number
}

class Class extends Model <InferAttributes<Class> , InferCreationAttributes<Class>> {
    declare classId : CreationOptional<number>
    declare class_name : string 
    declare gymId : ForeignKey<number>
    declare active : Active_Class[]
}

Class.init({
    classId : {type : "INTEGER" , autoIncrement : true , primaryKey : true} ,
    class_name : {type :"STRING" , defaultValue : "" , allowNull : false} ,
    gymId : {type : "INTEGER" , references : {model : "GYM" , key : "gymId"} } ,
    active : {type : DataTypes.JSON , defaultValue : []}
},{
    tableName : "Class",
    sequelize : sequelize,
    underscored : true ,
    timestamps : true
})


//todo create migration file 