import express from "express"
import { createProduct, getAllProduct, getSingleProduct } from "../Controller/productController.js"
import { upload } from "../common/imageUpload.js"

export const productRouter = express.Router() 

productRouter.post("/createProduct",upload.single("productImage"), createProduct)

productRouter.get("/getAllProduct", getAllProduct)
productRouter.get("/getSingleProduct/:_id", getSingleProduct)