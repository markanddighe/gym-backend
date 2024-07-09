import express from "express"
import { createSubToExercise, singleDetils } from "../Controller/sub-to-sub-Exercise-Controller.js"
import { upload } from "../common/imageUpload.js"

export const subToSubExerciseRouter = express.Router()


subToSubExerciseRouter.post("/createSubToSubExercise",upload.single("SubToSubExerciseImage"),createSubToExercise)


subToSubExerciseRouter.get("/getSubToSubExercise/:subExerciseId",singleDetils)


