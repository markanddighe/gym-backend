import mongoose from "mongoose"


const subToSubExerciseSchema = new mongoose.Schema({


    SubToSubExerciseImage: {
        type: String
    },

    subExerciseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subExercise"
    }],

    exerciseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    }],

    description: {
        type: String
    },

    Notes: [{
        SetsAndReps: {
            type: String
        },

        weight: {
            type: String
        },

        comment: {
            type: String
        }
    }]

}, { timestamps: true })


export const SubToSubExercise = mongoose.model("SubToSubExercise", subToSubExerciseSchema) 
 