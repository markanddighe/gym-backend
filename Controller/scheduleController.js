import { Schedule } from "../Model/scheduleModel.js";
import { Trainer } from "../Model/trainerModel.js";


export const createSchedule = async (req, res) => {

    const { title, sportType, trainer, startTime, endTime, dayOfWeek } = req.body

    if (!sportType || !trainer) {
        return res.status(400).send({
            status: 400,
            message: "enter the required field"
        })
    }

    const checkTrainer = await Trainer.findOne({ isActive: false })

    if (checkTrainer) {
        return res.status(404).send({
            status: 404,
            message: "trainer not available"
        })
    }

    const overlappingSchedule = await Schedule.findOne({
        trainer: trainer,
        dayOfWeek: dayOfWeek,
        $or: [
            {
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            }
        ]
    });

    if (overlappingSchedule) {
        return res.status(409).send({
            status: 409,
            message: "Trainer is already booked for the given time slot"
        });
    }

    const saveSchedule = new Schedule({
        title, sportType, trainer, startTime, endTime, dayOfWeek
    })

    const newSchedule = await saveSchedule.save()

    res.status(200).send({
        status: 200,
        message: "book trainer",
        BookTrainer: newSchedule
    })
}