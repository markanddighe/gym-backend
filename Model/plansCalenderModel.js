import mongoose from "mongoose";

const plansCalenderSchema = new mongoose.Schema({

    daysName : {
        type : String
    },

    daysExerciseName : {
        type : String
    },


    // plansWeekId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "plansWeek"
    // }
    
},{timestamps : true})


export const PlansCalender = mongoose.model("plansCalender", plansCalenderSchema)
 