import mongoose from "mongoose";

const userModel = new mongoose.Schema({

    fullName : {
        type : String
    },

    email : {
        type : String
    },

    password : {
        type : String
    },

    phoneNumber : {
        type : Number
    },

    address : {
        type : String
    },

    isAdmin : {
        type : Boolean,
        default : false
    }
    
},{timestamps : true})

export const User = mongoose.model("User", userModel)
