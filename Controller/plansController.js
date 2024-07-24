import { PlansCalender } from "../Model/plansCalenderModel.js";
import { plansCategory } from "../Model/plansCategoryModel.js";
import { plansModelOne } from "../Model/plansModel-1.js";
import { Plans } from "../Model/plansModel.js";
import { PlansWeek } from "../Model/plansWeekModel.js";

//old wala
export const createPlans = async (req, res) => {

    try {
        const { bodyBuildingPlans, fatLossPlan, specialPlans, fitnessPlans, powerLiftingPlans } = req.body

        const checkPlans = await Plans.findOne({ bodyBuildingPlans })

        if (checkPlans) {
            return res.status(400).send({
                status: 400,
                message: "already have plans"
            })
        }

        const savePlans = new Plans({
            bodyBuildingPlans, fatLossPlan, specialPlans, fitnessPlans, powerLiftingPlans
        })

        const newPlans = await savePlans.save()

        res.status(200).send({
            status: 200,
            message: "created new plans",
            newPlan: newPlans
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}



// ----------------------------------------------------------------------------------------------

export const createPlansCategory = async (req, res) => {

    try {
        const { planCategoryName } = req.body

        if (!planCategoryName) {
            return res.status(400).send({
                status: 400,
                message: "enter plan category name"
            })
        }

        const checkPlansCategory = await plansCategory.findOne({ planCategoryName })

        if (checkPlansCategory) {
            return res.status(400).send({
                status: 400,
                message: "same as old plan category"
            })
        }

        const savePlansCategory = new plansCategory({
            planCategoryName
        })

        const newPlansCategory = await savePlansCategory.save()

        res.status(200).send({
            status: 200,
            message: "new plans category",
            newCategoryPlans: newPlansCategory
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getAllPlansCategory = async (req, res) => {

    try {
        const checkPlansCategory = await plansCategory.find({})

        if (checkPlansCategory.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all plans categorys",
                allPlansCategorys: checkPlansCategory
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found any plans"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }

}



export const createPlansNew = async (req, res) => {

    try {
        const { planCategoryId, duration, lock } = req.body

        const plansImage = req.file.filename


        if (!planCategoryId) {
            return res.status(400).send({
                status: 400,
                message: "enter the plan category"
            })
        }

        const savePlans = new Plans({
            planCategoryId, duration, lock, plansImage
        })

        const newPlans = await savePlans.save()

        res.status(200).send({
            status: 200,
            message: "new plans",
            newPlan: newPlans
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}



export const getAllPlans = async (req, res) => {

    try {
        const checkPlans = await Plans.find({}).populate({
            path: "planCategoryId",
            select: "planCategoryName"
        })

        if (checkPlans.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all plans",
                plans: checkPlans
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found any plans"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


// category according plan get

export const getPlanCategoryHelp = async (req, res) => {

    const { planCategoryId } = req.params

    const check = await Plans.find({ planCategoryId })

    if (check) {
        res.send(check)
    }
    else {
        res.send("no data")
    }
}

export const createPlansOne = async (req, res) => {

    const { about, duration, goal, requirements, targetGroup, plansId } = req.body


    const checkPlans = await plansModelOne.findOne({ plansId })

    if (checkPlans) {
        return res.status(400).send({
            status: 400,
            message: "have already"
        })
    }

    const savePlansOne = new plansModelOne({
        about, duration, goal, requirements, targetGroup, plansId
    })

    const newPlansOne = await savePlansOne.save()

    res.status(200).send({
        status: 200,
        message: "new plans details",
        newPlansDetails: newPlansOne
    })
}



export const getAllPlansOne = async (req, res) => { 

    try {

        const { plansId } = req.params

        const checkPlans = await plansModelOne.find({ plansId }).populate({
            path: "plansId",
            select: "plansImage"
        })

        const weeks = await PlansWeek.find({ plansId: plansId });

        const week = weeks.map(week => ({
            _id: week._id,
            weekName: week.weekName,
        }))

        if (checkPlans) {
            res.status(200).send({
                status: 200,
                message: "all plans",
                plans: checkPlans,
                week
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found any plans"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


// PLANS WEEK HEADING 

export const createPlansWeek = async (req, res) => {

    const { weekName, plansAboutId, plansId } = req.body

    const savePlansWeek = new PlansWeek({
        weekName, plansAboutId, plansId
    })

    const newPlansWeek = await savePlansWeek.save()

    res.status(200).send({
        status: 200,
        message: "new plans Week",
        newPlansWeeks: newPlansWeek
    })


}




export const getAllPlansWeek = async (req, res) => {

    try {
        const checkPlansWeek = await PlansWeek.find({}).populate({
            path: "plansAboutId",
            select: "about duration goal requirements targetGroup"
        })

        if (checkPlansWeek.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all plans Week",
                allPlansWeeks: checkPlansWeek
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found any plans week"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }

}




// CREATE PLANS CALENDERS


export const createPlansWeekCalender = async (req, res) => {

    const { daysName, daysExerciseName } = req.body


    const checkPlansCalender = await PlansCalender.findOne({ daysName })

    if (checkPlansCalender) {
        return res.status(400).send({
            status: 400,
            message: "have already"
        })
    }

    const savePlansCalender = new PlansCalender({
        daysName, daysExerciseName
    })

    const newPlansCalender = await savePlansCalender.save()

    res.status(200).send({
        status: 200,
        message: "new plans Week",
        newPlansCalenders: newPlansCalender
    })
}



export const getAllPlansCalenders = async (req, res) => {

    try {
        const checkPlansCalenders = await PlansCalender.find({})

        if (checkPlansCalenders.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all plans calenders",
                plans: checkPlansCalenders
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found any plans calenders"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}
