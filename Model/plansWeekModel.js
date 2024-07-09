import mongoose from "mongoose";

const plansWeekSchema = new mongoose.Schema({

    weekName : {
        type : String
    },

    plansAboutId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "plansModelOne"
    },

    plansId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "plans"
    }]

},{timestamps : true})


export const PlansWeek = mongoose.model("plansWeek", plansWeekSchema) 
 