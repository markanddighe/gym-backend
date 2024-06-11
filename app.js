import express from "express"
import { connectDb } from "./connection/db.js"
import { roleRouter } from "./Routes/roleRouter.js"
import { userRouer } from "./Routes/userRouer.js"
import { categoryRouter } from "./Routes/categoryRouter.js"
import { productRouter } from "./Routes/productRouter.js"
import { trainerRouter } from "./Routes/trainerRouter.js"
import { sportTyperouter } from "./Routes/sportTypeRouter.js"
import { scheduleRouter } from "./Routes/scheduleRouter.js"
import { exerciseRouter } from "./Routes/exerciseRouter.js"
import { subExerciseRouter } from "./Routes/sub-Exercise-Router.js"
import cors from "cors"

const app = express()

connectDb()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", roleRouter)
app.use("/", userRouer)
app.use("/", categoryRouter)
app.use("/", productRouter)
app.use("/", trainerRouter)
app.use("/", sportTyperouter)
app.use("/", scheduleRouter)
app.use("/", exerciseRouter)
app.use("/", subExerciseRouter)


app.use("/", express.static("public/upload"))

const port = 8000

app.listen(port, () => {
    console.log(`server on at port = ${port}`);
})