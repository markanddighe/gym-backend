import { Trainer } from "../Model/trainerModel.js";


export const createTrainer = async (req, res) => {

    const { fullName, email, phoneNumber, gender, isActive, sportstype } = req.body

    if (!fullName) {
        return res.status(400).send({
            status: 400,
            message: "enter a full Name"
        })
    }

    const checkTrainer = await Trainer.findOne({ email })

    if (checkTrainer) {
        return res.status(400).send({
            status: 400,
            message: "same as old trainer"
        })
    }

    const saveTrainer = new Trainer({
        fullName, email, phoneNumber, gender, isActive, sportstype
    })

    const newTrainer = await saveTrainer.save()

    res.status(200).send({
        status: 200,
        message: "new created trainer",
        trainer: newTrainer
    })
}


export const getAllTriner = async (req, res) => {

    const checkTrainer = await Trainer.find({}).populate({
        path : "sportstype",
        select : "sportsTypeName"
    })

    if (checkTrainer.length > 0) {
        res.status(200).send({
            status: 200,
            message: "all trainer list",
            allTrainers: checkTrainer
        })
    }

    else {
        res.status(404).send({
            status: 404,
            message: "not found trainer"
        })
    }
}


export const getSingle = async (req, res) => {

    try {
        const { _id} = req.params

        const checkTrainer = await Trainer.findById(_id).populate({
            path : "sportstype",
            select : "sportsTypeName"
        })

        if (checkTrainer.isActive == true) {
            res.status(200).send({
                status: 200,
                message: "tainer details",
                trainer: checkTrainer
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found trainer"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const DisActive = async (req, res) => {

    try {
        
    const { trainerId } = req.params

    const { isActive } = req.body


    const change = await Trainer.findByIdAndUpdate({ _id: trainerId }, {
        isActive
    }, { new: true })

    if (change) {
        res.status(200).send({
            status: 200,
            message: "DisActive trainer",
            DisActive: change
        })
    }
    else {
        res.status(404).send({
            status: 404,
            message: "not found trainer"
        })
    }
    } catch (error) {
        res.send(error.message)
    }

}


export const ActiveTrainer = async (req, res) => {

    try {
        const { trainerId } = req.params
        const { isActive } = req.body
    
    
        const change = await Trainer.findByIdAndUpdate(trainerId , {
            isActive
        }, { new: true })
        if (change) {
            res.status(200).send({
                status: 200,
                message: "Active trainer",
                DisActive: change
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found trainer"
            })
        }
    }       
     catch (error) {
        res.send(error.message)
    }

}



export const DeleteTrainer = async (req, res) => {

    try {
        const {trainerId} = req.params

        const deleteData = await Trainer.findByIdAndDelete(trainerId)
    
        if(deleteData) {
            res.status(200).send({
                status : 200,
                message : "delete Trainer"
            })
        }
        else {
            res.status(404).send({
                status : 404,
                message : "not found trainer"
            })
        }
    } catch (error) {
        res.send(error.message)
    }

   
}



export const updateTrainer = async (req, res) => {
    try {
        const {_id} = req.params
        const { fullName, email, phoneNumber, gender } = req.body
    

    
        const change = await Trainer.findByIdAndUpdate(_id , {
            fullName, email, phoneNumber, gender
        }, { new: true })
        if (change) {
            res.status(200).send({
                status: 200,
                message: "update trainer",
                DisActive: change
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found trainer"
            })
        }
    }       
     catch (error) {
        res.send(error.message)
    }
}