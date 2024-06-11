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
    }
},{timestamps : true})


export const SubExercise = mongoose.model("subExercise", subExerciseSchema) 
