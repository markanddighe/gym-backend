import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({

    exerciseName : {
        type : String
    },

    exerciseImage : {
        type : String
    }
},{timestamps : true})

export const Exercise = mongoose.model("Exercise", exerciseSchema)
 