import mongoose from "mongoose";

const scheduleModel = new mongoose.Schema({

    title : {
        type : String
    },

    sportType : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sportstype"
    },

    trainer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Trainer"
    },

    startTime : {
        type : Date
    },

    endTime : {
        type : Date
    },

    dayOfWeek : {
        type : Number
    }
},{timestamps : true})


export const Schedule = mongoose.model("Schedule", scheduleModel) 
 