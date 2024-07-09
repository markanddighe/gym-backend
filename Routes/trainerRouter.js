import express from "express"
import { ActiveTrainer, createTrainer, DeleteTrainer, DisActive, getAllTriner, getSingle, updateTrainer } from "../Controller/trainerController.js"
import { upload } from "../common/imageUpload.js"


export const trainerRouter = express.Router()

trainerRouter.post("/createTrainer",upload.single("trainerImage"), createTrainer)
trainerRouter.get("/getAllTrainer", getAllTriner)
trainerRouter.put("/DisActive/:trainerId", DisActive)
trainerRouter.put("/Active/:trainerId", ActiveTrainer)

trainerRouter.delete("/deleteTrainer/:trainerId", DeleteTrainer)



trainerRouter.put("/updateTrainer/:_id", updateTrainer)

trainerRouter.get("/singleTrainer/:_id", getSingle)