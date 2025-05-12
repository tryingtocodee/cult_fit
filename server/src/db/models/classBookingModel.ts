import {Model , InferAttributes , InferCreationAttributes , CreationOptional , ForeignKey , DataTypes} from "sequelize"
import sequelize from "./sequelize"

type Confirmed_Users ={
    userId : number ,
    attended : boolean ,
    cancel : boolean , // if user cancels the booking 
}

type Waitlist_Users = {
    userId : number
}


class Class_Booking extends Model {
    declare classBookingId : CreationOptional<number>
    declare classId : ForeignKey<number>
    declare userId : ForeignKey<number>
    declare gymId : ForeignKey<number>
    declare confirmed : Confirmed_Users[]
    declare waitlist : Waitlist_Users[]
}

Class_Booking.init({
    classBookingId : {type : "INTEGER" , autoIncrement : true , primaryKey : true},
    classId : {type : "INTEGER" , references : {model : "Class" , key : "classId"}} ,
    userId : {type : "INTEGER" , references : {model : "User" , key : "id"}},
    gymId : {type : "INTEGER" , references : {model : "Gym" , key : "gymId"}},
    confirmed : {type : DataTypes.JSON , defaultValue : []} ,
    waitlist : {type : DataTypes.JSON , defaultValue : []} 
} , {
    tableName : "Class_Booking",
    sequelize : sequelize,
    underscored : true ,
    timestamps : true
})

export default Class_Booking
//todo create migration file 