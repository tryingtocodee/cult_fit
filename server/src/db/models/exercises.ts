import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";


type Video = {
    videoUrl : string ,
    videoId : string
}


class Exercise extends Model <InferAttributes<Exercise> , InferCreationAttributes<Exercise> > {
    declare exercise : CreationOptional<number>
    declare classId : ForeignKey<number>
    declare gymId : ForeignKey<number>
    declare exercise_name : string 
    declare description : string 
    declare difficult : "easy" | "medium" | "difficult" 
    declare video_asset : Video[]
}

Exercise.init({
    exercise : {type : "INTEGER" , primaryKey : true , autoIncrement : true} ,
    classId : {type : "INTEGER" , references : {model : "Class" , key : "classId"}},
    gymId : {type : "INTEGER" , references : {model : "Gym" , key : "gymId"}} ,
    exercise_name : {type : "STRING" , allowNull : false} ,
    description : {type : "STRING" , allowNull : false } ,
    difficult : {type : DataTypes.ENUM('easy' , 'medium' , 'difficult')},
    video_asset : {type : DataTypes.JSON , defaultValue : []},
   
} ,{
    tableName : "Exercise",
    underscored : true ,
    timestamps : true ,
    sequelize : sequelize
})

//todo create migration file 