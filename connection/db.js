import mongoose from "mongoose"

const url = "mongodb://localhost:27017/gymproject"

export const connectDb = async () => {

    try {
        const conn = mongoose.connect(url)
        console.log("connect to db");

    } catch (error) {
        console.log("not connect to db");
    }
}