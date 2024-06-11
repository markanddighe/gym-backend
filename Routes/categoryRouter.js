import express from "express"
import { createCategory, getAllCategory, singleCategory } from "../Controller/categoryController.js"


export const categoryRouter = express.Router()

categoryRouter.post("/createCategory", createCategory)
categoryRouter.get("/getAllCategory", getAllCategory)
categoryRouter.get("/singleCategory", singleCategory)

