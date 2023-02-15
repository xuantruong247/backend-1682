const Product = require("../models/productModel")


// create product
const createProductSer = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    success: false,
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, image, type, countInStock, price, rating, description
            })
            if (newProduct) {
                resolve({
                    success: true,
                    data: newProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProductSer = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    success: false,
                    message: "The product is not defined"
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                success: true,
                message: "Update Successfull",
                data: updateProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}


const getDetailProductSer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    success: false,
                    message: "The product is not defined"
                })
            }
            resolve({
                success: true,
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}


//delete product
const deleteProductSer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productID = await Product.findOne({
                _id: id
            })
            if (productID === null) {
                resolve({
                    success: false,
                    message: "The productID is not required"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                success: true,
                message: "Delete product Successfull"
            })
        } catch (error) {
            reject(error)
        }
    })
}


//get all product
const getAllProductSer = (limit = 8, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            const getAllProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                success: true,
                data: getAllProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProductSer,
    updateProductSer,
    getDetailProductSer,
    deleteProductSer,
    getAllProductSer
}