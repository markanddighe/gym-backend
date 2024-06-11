import express from "express"
import { createRole, getAllRole, getSingleRole } from "../Controller/roleController.js"


export const roleRouter = express.Router()

roleRouter.post("/createRole", createRole)
roleRouter.get("/getAllRole", getAllRole)
roleRouter.get("/getSingleRole", getSingleRole)
