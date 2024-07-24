import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },



    planPaymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plans"
    },


    status: {
        type: String,
        default: "unpaid"
    },
    sessionId:
    {
        type: String
    }

}, { timestamps: true })


export const Payment = mongoose.model("Payment", paymentSchema)

