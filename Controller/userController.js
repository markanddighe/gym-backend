import { comparePassword, hashPassword } from "../common/password.js";
import { generateToken } from "../common/token.js";
import { Payment } from "../Model/paymentModel.js";
import { User } from "../Model/userModel.js";
import Stripe from "stripe"
import dotenv from 'dotenv';
import { Plans } from "../Model/plansModel.js";
dotenv.config()

var s = process.env.SECRET_KEY
const stripe = new Stripe(s)

export const userRegister = async (req, res) => {

    try {
        const { fullName, email, password, phoneNumber, address } = req.body

        if (!fullName || !email || !password || !phoneNumber || !address) {
            return res.status(401).send({
                status: 401,
                message: "enter the details"
            })
        }

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).send({
                status: 400,
                message: "same as old user"
            })
        }

        const hash = await hashPassword(password)
        const saveUser = new User({
            fullName, email, password: hash, phoneNumber, address
        })

        const newUser = await saveUser.save()
        res.status(200).send({
            status: 200,
            message: "register user done",
            registerUser: newUser
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


// export const loginUser = async (req, res) => {

//     const { email, phoneNumber, password } = req.body
//     if (!password) {
//         return res.status(400).send({
//             status: 400,
//             message: "enter the password"
//         })
//     }

//     let user
//     if (email) {
//         user = await User.findOne({ email })
//     }
//     else {
//         user = await User.findOne({ phoneNumber })
//     }
//     if (!user) {
//         return res.status(404).send({
//             status: 404,
//             message: "no user found"
//         })
//     }

//     const checkPassword = await comparePassword(password, user.password)
//     if (!checkPassword) {
//         return res.status(404).send({
//             status: 404,
//             message: "no user found"
//         })
//     }

//     const payload = {
//         role: "user",
//         _id: user._id,
//     }
//     const token = await generateToken(payload)
//     res.status(200).send({
//         status: 200,
//         message: "login user",
//         user: payload, token
//     })
// }



export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!password) {
            return res.status(400).send({
                status: 400,
                message: "enter the password"
            })
        }

        const checkUser = await User.findOne({ email })

        if (!checkUser) {
            return res.status(401).send({
                status: 401,
                message: "wrong email"
            })
        }

        const checkPassword = await comparePassword(password, checkUser.password)

        if (!checkPassword) {
            return res.status(400).send({
                status: 400,
                message: "wrong password"
            })
        }

        if (checkUser.isAdmin === false) {

            // const payload = {
            //     _id: checkUser._id,
            // }

            const _id = checkUser._id

            const token = await generateToken({ _id })

            res.status(200).send({
                status: 200,
                message: "welcome user",
                token,
                _id
            })
        }

        else {

            // const payload = {
            const _id = checkUser._id
            // }
            const token = await generateToken({ _id })

            res.status(200).send({
                status: 200,
                message: "welcome admin",
                token,
                _id
            })
        }


    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const singleUser = async (req, res) => {

    try {
        const { _id } = req.params

        const user = await User.findById({ _id: _id })
        if (user) {
            res.status(200).send({
                status: 200,
                message: "user details",
                userProfile: user
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found",
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {

    try {
        const { fullName, phoneNumber, address } = req.body

        const { _id } = req.params

        const user = await User.findByIdAndUpdate({ _id: _id }, {
            fullName, phoneNumber, address
        }, { new: true })

        if (user) {
            res.status(200).send({
                status: 200,
                message: "update user profile",
                updateUser: user
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found"
            })
        }
    } catch (error) {
        res.send(error.message)
    }


}


export const deleteUser = async (req, res) => {

    try {
        const { _id } = req.params

        const user = await User.findByIdAndDelete({ _id })
        if (user) {
            res.status(200).send({
                status: 200,
                message: "delete user details"
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({})

        if (users.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all user lists",
                users: users
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}



export const changePassword = async (req, res) => {

    try {
        const { email, password } = req.body

        const data = await User.findOne({ email })


        if (data) {
            const newpassword = await hashPassword(password)

            const changeUserPassword = await User.findOneAndUpdate({ email: email }, {
                $set: {
                    password: newpassword

                }
            })
            await changeUserPassword.save();

            res.status(200).send({ message: "Password is changed" });

        }
        else {
            res.status(400).send({ message: "email is not found" })
        }
    } catch (err) {

        res.status(400).send({ error: err.message });

    }
}



export const applyPayment = async (req, res) => {
    const { userId, planPaymentId } = req.body;

    try {
        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the plan based on planPaymentId
        const plan = await Plans.findById(planPaymentId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        if (!plan.amount) {
            return res.send("no amount")
        }


        const lineItems = {
            price_data: {
                currency: "USD",
                product_data: {
                    name: plan.duration
                },
                unit_amount: plan.amount * 100,
            },
            quantity: 1,
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [lineItems],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:8000/cancel',
        });

        const paymentData = new Payment({
            userId,
            planPaymentId,
            sessionId: session.id,
        })

        paymentData.save()

        res.status(200).json({ url: session.url, sessionId: session.id });

    } catch (error) {
        console.error('Error applying payment:', error);
        res.status(500).send('Failed to apply payment');
    }
};






export const getAllUserPayment = async (req, res) => {

    try {


        const allPayment = await Payment.find({}).populate({
            path: "userId",
            select: "fullName"
        }).populate({
            path: "planPaymentId",
            select: "duration amount"
        })

        var payData = {}

        const data = await allPayment.map((items) => {
            items.status
            payData = items.status
            // console.log(items.status);
        })

        console.log(payData);

        const payment = await Payment.find({});
        // console.log(payment,"54545");

        if (!payment) {
            return res.status(404).json({ error: 'Payment record not found' });
        }

        // console.log(session,"989892");


        res.status(200).json({ allPayment });

    } catch (error) {
        res.send(error.message)
    }


}





export const getPayment = async (req, res) => {

    const { userId } = req.params;

    try {
        // Fetch all payments for the given userId and populate related fields
        const allPayments = await Payment.find({ userId })
            .populate({
                path: 'userId',
                select: 'fullName',
            })
            .populate({
                path: 'planPaymentId',
                select: 'duration amount',
            });

        if (!allPayments || allPayments.length === 0) {
            return res.status(404).json({ error: 'No payment records found' });
        }

        // Process each payment record and update status
        const updatedPayments = await Promise.all(
            allPayments.map(async (payment) => {
                const { sessionId } = payment;

                if (!sessionId) {
                    throw new Error('Session ID is missing in one of the payment records');
                }

                const session = await stripe.checkout.sessions.retrieve(sessionId);

                if (!session) {
                    throw new Error('Stripe session not found for session ID: ' + sessionId);
                }

                const paymentStatus = session.payment_status;

                const updatedPayment = await Payment.findByIdAndUpdate(
                    payment._id,
                    { $set: { status: paymentStatus } },
                    { new: true }
                )
                    .populate({
                        path: 'userId',
                        select: 'fullName',
                    })
                    .populate({
                        path: 'planPaymentId',
                        select: 'duration amount',
                    });

                return updatedPayment;
            })
        );

        res.status(200).json({ updatedPayments });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
