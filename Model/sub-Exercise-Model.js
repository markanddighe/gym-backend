import mongoose from "mongoose";

const subExerciseSchema = new mongoose.Schema({

    subExerciseName : {
        type : String
    },

    subExerciseImage : {
        type : String
    },

    exerciseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Exercise"
    },

    calenderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "plansCalender"
    },

    likesSubExercise : {
        
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
    }


},{timestamps : true})


export const SubExercise = mongoose.model("subExercise", subExerciseSchema) 
