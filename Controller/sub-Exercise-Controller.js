import { SubExercise } from "../Model/sub-Exercise-Model.js";
import { User } from "../Model/userModel.js";


export const createSubExercise = async (req, res) => {

    try {
        const { subExerciseName, exerciseId, calenderId } = req.body

        const subExerciseImage = req.file.filename

        const check = await SubExercise.findOne({ subExerciseName })

        if (check) {
            return res.status(400).send({
                status: 400,
                message: "already add this"
            })
        }

        const saveSubExercise = new SubExercise({
            subExerciseName, subExerciseImage, exerciseId, calenderId
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
        const { exerciseId } = req.params

        const check = await SubExercise.find({ exerciseId }).populate({
            path : "exerciseId",
            select : "exerciseName"
        })

        if (check) {
            res.status(200).send({
                status: 200,
                message: "sub exercises",
                subExercise: check
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found sub exercise"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}




export const getExercises = async (req, res) => {

    try {

        const check = await SubExercise.find({}).populate({
            path : "exerciseId",
            select : "exerciseName"
        })

        if (check.length > 0) {
            res.status(200).send({
                status: 200,
                message: "sub exercises",
                subExercise: check
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found sub exercise"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getSubExerciseDaysAccording = async (req, res) => {

    try {
        const { calenderId } = req.params

        const check = await SubExercise.find({ calenderId }).populate({
            path : "calenderId",
            select : "daysName"
        })

        if (check) {
            res.status(200).send({
                status: 200,
                message: "sub exercises",
                subExercise: check
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found sub exercise"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}



export const updateSubExercise = async (req, res) => {

    const {subExerciseId} = req.params

    const {calenderId} = req.body


    const check = await SubExercise.findByIdAndUpdate({_id : subExerciseId}, {
        calenderId
    },{new :true})


    res.send(check)
}






export const likeSubExercises = async (req, res) => {
    try {
        const { subExerciseId } = req.params;
        const { likesSubExercise } = req.body; 

        const subExercise = await SubExercise.findById(subExerciseId);

        if (!subExercise) {
            return res.status(404).send("Sub exercise not found");
        }

        // const isLiked = subExercise.likesSubExercise.includes(likesSubExercise);

        const isLiked = subExercise.likesSubExercise

        if (isLiked) {
            const updatedSubExercise = await SubExercise.findByIdAndUpdate(
                subExerciseId,
                { $pull: { likesSubExercise: likesSubExercise } },
                { new: true }
            );
            return res.json(updatedSubExercise);
        } else {
            const updatedSubExercise = await SubExercise.findByIdAndUpdate(
                subExerciseId,
                { $push: { likesSubExercise: likesSubExercise } },
                { new: true }
            );
            return res.json(updatedSubExercise);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getAllLike = async (req, res) => {

    try {
        const { likesSubExercise } = req.params 


        const check = await SubExercise.find({ likesSubExercise }).populate({path:"likesSubExercise",select:"fullName"})

        console.log(check);

        if (check) {
            res.status(200).send({
                status: 200,
                message: "like",
                subExercise: check
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}
