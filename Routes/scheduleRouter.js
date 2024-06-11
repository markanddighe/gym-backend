import express from "express"
import { createSchedule } from "../Controller/scheduleController.js"

export const scheduleRouter = express.Router()
 
scheduleRouter.post("/bookSchedule", createSchedule) 