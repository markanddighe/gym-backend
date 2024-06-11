import { Exercise } from "../Model/exerciseModel.js";


export const createExercise = async (req, res) => {

    const { exerciseName } = req.body

    const exerciseImage = req.file.filename

    if (!exerciseName) {
        return res.status(400).send({
            status: 400,
            message: "enter the exercise name"
        })
    }

    const checkExercise = await Exercise.findOne({ exerciseName })
    if (checkExercise) {
        return res.status(400).send({
            status: 400,
            message: "same as old name"
        })
    }

    const saveExercise = new Exercise({
        exerciseName, exerciseImage
    })

    const newExercise = await saveExercise.save()

    res.status(200).send({
        status: 200,
        message: "new exercise created",
        exercises: newExercise
    })
}


export const getAllExercise = async (req, res) => {

    try {
        const checkExercises = await Exercise.find({})

        if (checkExercises) {
            res.status(200).send({
                status: 200,
                message: "all exercises",
                exercises: checkExercises
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found any exercises"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getSingleExercise = async (req, res) => {

    try {
        const { exerciseId } = req.params

        const checkExercise = await Exercise.findById({ _id: exerciseId })

        if (checkExercise) {
            res.status(200).send({
                status: 200,
                message: "exercises are :",
                exercises: checkExercise
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found exercises"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }

}