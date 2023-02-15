const { response } = require("express")
const productSer = require("../service/productSer")


const createProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description } = req.body

        if (!name || !image || !type || !countInStock || !price || !rating) {
            return res.status(200).json({
                status: false,
                message: 'The input is required'
            })
        }
        const response = await productSer.createProductSer(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            error
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const data = req.body

        if (!productID) {
            return res.status(404).json({
                success: false,
                message: "The ProductID is required"
            })
        }
        const response = await productSer.updateProductSer(productID, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
}


//get detail product
const getDetailProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(400).json({
                success: false,
                message: "The productID is required"
            })
        }
        const response = await productSer.getDetailProductSer(productID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(400).json({
                success: false,
                message: "The ProductID is required"
            })
        }
        const response = await productSer.deleteProductSer(productID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
}

//get all product
const getAllProduct = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await productSer.getAllProductSer(Number(limit), Number(page))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
}