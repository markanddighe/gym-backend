import mongoose from "mongoose";


const plansCategorySchema = new mongoose.Schema({

    planCategoryName : {
        type : String
    }

},{timestamps : true})

 
export const plansCategory = mongoose.model("plansCategory", plansCategorySchema) 