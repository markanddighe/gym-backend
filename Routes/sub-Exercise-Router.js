import express from "express"
import { createSubExercise, getExerciseAccording } from "../Controller/sub-Exercise-Controller.js"
import { upload } from "../common/imageUpload.js"

export const subExerciseRouter = express.Router()

subExerciseRouter.post("/createSubExercise",upload.single("subExerciseImage"), createSubExercise)


subExerciseRouter.get("/getSubExercise/:exerciseId", getExerciseAccording)

