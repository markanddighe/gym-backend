import { Product } from "../Model/productModel.js";


export const createProduct = async (req, res) => {

    try {
        const { productName, price, colors, category, stocks, description } = req.body

        // const productImage = req.file.filename

        const productImage = req.file ? req.file.filename : null;

        if (!productName) {
            return res.status(400).send({
                status: 400,
                message: "enter the product name"
            })
        }

        const checkProduct = await Product.findOne({ productName })

        if (checkProduct) {
            return res.status(400).send({
                status: 400,
                message: "same as old product"
            })
        }

        const saveProduct = new Product({
            productName, price, colors, category, stocks, description, productImage
        })

        const newProduct = await saveProduct.save()

        res.status(200).send({
            status: 200,
            message: "new product created",
            product: newProduct
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }

}


export const getAllProduct = async (req, res) => {

    const checkProduct = await Product.find({}).populate({
        path: "category",
        select: "categoryName"
    })

    if (checkProduct.length > 0) {
        res.status(200).send({
            status: 200,
            message: "all product list",
            products: checkProduct
        })
    }

    else {
        res.status(404).send({
            status: 404,
            message: "no product found"
        })
    }
}


export const getSingleProduct = async (req, res) => {

    try {
        const { _id } = req.params

        const checkProduct = await Product.findById({ _id: _id }).populate({
            path: "category",
            select: "categoryName"
        })

        if (checkProduct) {
            res.status(200).send({
                status: 200,
                message: "product details",
                product: checkProduct
            })
        }

        else {
            res.status(404).send({
                status: 404,
                message: "not found product"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}