import { SubExercise } from "../Model/sub-Exercise-Model.js";


export const createSubExercise = async (req, res) => {

    try {
        const { subExerciseName, exerciseId } = req.body

        const subExerciseImage = req.file.filename

        const check = await SubExercise.findOne({ subExerciseName })

        if (check) {
            return res.status(400).send({
                status: 400,
                message: "already add this"
            })
        }

        const saveSubExercise = new SubExercise({
            subExerciseName, subExerciseImage, exerciseId
        })

        const newSubExercise = await saveSubExercise.save()

        res.status(200).send({
            status: 200,
            message: "created sub exercise",
            subExercise: newSubExercise
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getExerciseAccording = async (req, res) => {

    try {
        const  {exerciseId}  = req.params

        //find krna hai.....................
        const check = await SubExercise.findById({ exerciseId})

        if(check) {
            res.status(200).send({
                status : 200,
                message : "sub exercises",
                subExercise : check
            })
        }
        else {
            res.status(404).send({
                status : 404,
                message : "not found sub exercise"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}