import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName : {
        type : String
    },

    price : {
        type : String
    },

    colors : {
        type : Array
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },

    stocks : {
        type :Number
    },

    description : {
        type : String
    },

    productImage : {
        type : String
    }

},{timestamps : true})

 
export const Product = mongoose.model("Product", productSchema) 
