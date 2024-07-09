import mongoose from "mongoose";

const plansSchemaOne = new mongoose.Schema({

    about : {
        type : String
    },

    duration : {
        type : String
    },

    goal : {
        type : String
    },

    requirements : {
        type : String
    },

    targetGroup : {
        type : String
    },

    plansId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "plans"
    }]

},{timestamps : true})



export const plansModelOne = mongoose.model("plansModelOne", plansSchemaOne)