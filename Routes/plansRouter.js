import express from "express"
import { createPlans, createPlansCategory, createPlansNew, createPlansOne, createPlansWeek, createPlansWeekCalender, getAllPlans, getAllPlansCalenders, getAllPlansCategory, getAllPlansOne, getAllPlansWeek, getPlanCategoryHelp } from "../Controller/plansController.js"
import { upload } from "../common/imageUpload.js"
import { getSubExerciseDaysAccording } from "../Controller/sub-Exercise-Controller.js"

export const plansRouter = express.Router()





// PLANS CATEGORY

plansRouter.post("/createPlanCategory", createPlansCategory)

plansRouter.get("/getAllPlansCategory", getAllPlansCategory)

plansRouter.post("/createNewPlans",upload.single("plansImage"),createPlansNew)



// PLANS HOME
plansRouter.post("/createPlans",upload.single("plansImage"), createPlans)

plansRouter.get("/allPlans", getAllPlans)

// category help get plan

plansRouter.get("/allPlansCategory/:planCategoryId", getPlanCategoryHelp)





// PLANS DETAILS

plansRouter.post("/createPlansDetails", createPlansOne)

plansRouter.get("/allPlansOne/:plansId", getAllPlansOne)




// PLANS WEEK HEADING

plansRouter.post("/createPlansWeek", createPlansWeek)


plansRouter.get("/allPlansWeeks", getAllPlansWeek)


// PLANS CALENDERS

plansRouter.post("/createPlansCalender", createPlansWeekCalender)

plansRouter.get("/getAllPlansCalenders", getAllPlansCalenders)


// PLANS CALENDER SUB EXERCISE

plansRouter.get("/getAllCalenderExercise/:calenderId", getSubExerciseDaysAccording)


