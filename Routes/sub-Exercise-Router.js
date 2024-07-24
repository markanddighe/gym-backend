import express from "express"
import { createSubExercise, getAllLike, getExerciseAccording, getExercises, likeSubExercises, updateSubExercise } from "../Controller/sub-Exercise-Controller.js"
import { upload } from "../common/imageUpload.js"
import { checkAuth } from "../middleware/checkAuth.js"



export const subExerciseRouter = express.Router()

subExerciseRouter.post("/createSubExercise",upload.single("subExerciseImage"), createSubExercise)


subExerciseRouter.get("/getSubExercise/:exerciseId", getExerciseAccording)



subExerciseRouter.get("/getSubExercises", getExercises)


subExerciseRouter.put("/updateSubExercise/:subExerciseId", updateSubExercise)


subExerciseRouter.put("/likes/:subExerciseId", likeSubExercises)

subExerciseRouter.get("/allLikes/:likesSubExercise", getAllLike)










