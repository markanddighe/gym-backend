import { SubToSubExercise } from "../Model/sub-to-sub-Exercise-Model.js";


export const createSubToExercise = async (req, res) => {

    try {
        const { subExerciseId, exerciseId, description, Notes } = req.body

        const SubToSubExerciseImage = req.file.filename

        const saveDetails = new SubToSubExercise({

            subExerciseId, exerciseId, description, Notes, SubToSubExerciseImage
        })

        const newSubToSubExercise = await saveDetails.save()

        res.status(200).send({
            status: 200,
            message: "sub to sub exercise created",
            SubToSubExercise: newSubToSubExercise
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


// export const singleDetils = async (req, res) => {

//     try {
//         const { subToSubExerciseId } = req.params

        // const check = await SubToSubExercise.findById({ _id: subToSubExerciseId }).populate({
        //     path : "subExerciseId",
        //     select : "subExerciseName"
        // }).populate({
        //     path : "exerciseId",
        //     select : "exerciseName"
        // })

//         if (check) {
//             res.status(200).send({
//                 status: 200,
//                 message: "sub to sub Exercise",
//                 subToSubExercise: check
//             })
//         }

//         else {
//             res.status(404).send({
//                 status: 404,
//                 message: "not found details"
//             })



//         }
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error.message
//         })
//     }



// }






export const singleDetils = async (req, res) => {

    try {
        const { subExerciseId } = req.params

        const check = await SubToSubExercise.find({ subExerciseId }).populate({
            path : "subExerciseId",
            select : "subExerciseName"
        }).populate({
            path : "exerciseId",
            select : "exerciseName"
        })


        if (check) {
            res.status(200).send({
                status: 200,
                message: "sub to sub Exercise",
                subToSubExercise: check
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found details"
            })


            
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }



}