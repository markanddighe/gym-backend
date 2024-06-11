import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({

    roleName : {
        type : String
    }
}, {timestamps : true})

export const Role = mongoose.model("Role", roleSchema)
