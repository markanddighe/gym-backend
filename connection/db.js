import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const url =process.env.MONGO_URL

export const connectDb = async () => {

    try {
        const conn = mongoose.connect(url)
        console.log("connect to db");

    } catch (error) {
        console.log("not connect to db");
    }
}