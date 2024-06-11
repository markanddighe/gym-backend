import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({

    fullName : {
        type : String
    },

    email : {
        type : String
    },

    phoneNumber : {
        type : Number
    },

    gender : {
        type : String
    },

    isActive : {
        type : Boolean,
        default : false
    },

    sportstype : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sportstype"
    }]
},{timestamps : true})

export const Trainer = mongoose.model("Trainer", trainerSchema)

