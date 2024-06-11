import { SportsType } from "../Model/sportTypeModel.js";


export const createSportsType = async (req, res) => {

    const { sportsTypeName, description } = req.body

    if (!sportsTypeName) {
        return res.status(400).send({
            status: 400,
            message: "enter the sports type"
        })
    }

    const saveSport = new SportsType({
        sportsTypeName, description
    })

    const newSportType = await saveSport.save()

    res.status(200).send({
        status: 200,
        message: "created sports type",
        sportType: newSportType
    })
}



export const getAllSportType = async (req, res) => {

    const checkSportType = await SportsType.find({})

    if (checkSportType.length > 0) {
        res.status(200).send({
            status: 200,
            message: "all sports types",
            sportsTypes: checkSportType
        })
    }

    else {
        res.status(404).send({
            status: 404,
            message: "not found sports types"
        })
    }
}


export const singleSportType = async (req, res) => {

    try {
        const { sportTypeId } = req.query

        const check = await SportsType.findById({ _id: sportTypeId })

        if (check) {
            res.status(200).send({
                status: 200,
                message: "sport types",
                sportType: check
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found sport type"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}