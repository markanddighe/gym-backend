import mongoose from "mongoose";

const sportsTypeSchema = new mongoose.Schema({

    sportsTypeName : {
        type : String
    },

    description : {
        type : String
    }
    
},{timestamps : true})
 
export const SportsType = mongoose.model("Sportstype", sportsTypeSchema) 