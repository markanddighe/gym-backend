import { Role } from "../Model/roleModel.js";


export const createRole = async (req, res) => {

    const { roleName } = req.body
    if (!roleName) {
        return res.status(400).send({
            status: 400,
            message: "enter the valid role"
        })
    }

    const checkRole = await Role.findOne({ roleName })
    if (checkRole) {
        return res.status(400).send({
            status: 400,
            message: "already have this role"
        })
    }
    const saveRole = new Role({
        roleName
    })
    const newRole = await saveRole.save()
    res.status(200).send({
        status: 200,
        message: "new role created",
        role: newRole
    })
}


export const getAllRole = async (req, res) => {

    const checkRole = await Role.find({})

    if (checkRole.length > 0) {
        res.status(200).send({
            status: 200,
            message: "all roles",
            roles: checkRole
        })
    }
    else {
        res.status(404).send({
            status: 404,
            message: "not found any role"
        })
    }
}


export const getSingleRole = async (req, res) => {

    try {
        const { roleId } = req.query

        const checkRole = await Role.findOne({ _id: roleId })
        if (checkRole) {
            res.status(200).send({
                status: 200,
                message: "role are :",
                role: checkRole
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "not found role"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}