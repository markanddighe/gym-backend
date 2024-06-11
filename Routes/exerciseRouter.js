import express from "express"
import { createExercise, getAllExercise, getSingleExercise } from "../Controller/exerciseController.js"
import { upload } from "../common/imageUpload.js"

export const exerciseRouter = express.Router()

exerciseRouter.post("/createExercise",upload.single("exerciseImage"), createExercise)

exerciseRouter.get("/getAllExercises", getAllExercise)

exerciseRouter.get("/singleExercise/:exerciseId", getSingleExercise)