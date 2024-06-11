import express from "express"
import { createSportsType, getAllSportType, singleSportType } from "../Controller/sportsTypeController.js"

export const sportTyperouter = express.Router()

sportTyperouter.post("/createSportType", createSportsType)

sportTyperouter.get("/allSportType", getAllSportType)

sportTyperouter.get("/singleSportType", singleSportType)