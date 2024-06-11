import { Category } from "../Model/categoryModel.js";


export const createCategory = async (req, res) => {

    const { categoryName } = req.body

    if (!categoryName) {
        return res.status(400).send({
            status: 400,
            message: "enter the category"
        })
    }

    const check = await Category.findOne({ categoryName })
    if (check) {
        return res.status(400).send({
            status: 400,
            message: "already have category"
        })
    }

    const saveCategory = new Category({
        categoryName
    })

    const newCategory = await saveCategory.save()

    res.status(200).send({
        status: 200,
        message: "new categorys",
        category: newCategory
    })
}


export const getAllCategory = async (req, res) => {

    const checkCategory = await Category.find({})

    if (checkCategory.length > 0) {
        res.status(200).send({
            status: 200,
            message: "category are :",
            category: checkCategory
        })
    }

    else {
        res.status(404).send({
            status: 404,
            message: "no category found"
        })
    }
}


export const singleCategory = async (req, res) => {

    try {
        const { categoryId } = req.query

        const checkCategory = await Category.findById({ _id: categoryId })

        if (checkCategory) {
            res.status(200).send({
                status: 200,
                message: "category are :",
                category: checkCategory
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found category"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}