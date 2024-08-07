import express from "express"
import { applyPayment, changePassword, deleteUser, getAllUserPayment, getAllUsers, getPayment, loginUser, singleUser, updateUser, userRegister } from "../Controller/userController.js"

export const userRouer = express.Router()

userRouer.post("/userRegister", userRegister)

userRouer.post("/loginUser", loginUser)

userRouer.get("/userProfile/:_id", singleUser)

userRouer.put("/updateUser/:_id", updateUser)

userRouer.delete("/deleteUser/:_id", deleteUser)

userRouer.get("/usersList", getAllUsers)


userRouer.post("/changePassword", changePassword)


userRouer.post("/applyPayment", applyPayment)


userRouer.get("/getPayment/:userId", getPayment)


userRouer.get("/getAllUserPayment", getAllUserPayment)









