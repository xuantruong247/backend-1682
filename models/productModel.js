const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter product Name"],
        trim: true
    },
    price: {
        type: String,
        require: [true, "Please Enter product Name"],
        maxLength: [8, "Price canot exceed 8 characters"]
    },
    description: {
        type: String,
        require: [true, "Please Enter product Name"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    category: {
        type: String,
        require: [, "Please Enter Product Category"],

    },
    Stock: {
        type: Number,
        require: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot 4 characters"],
        default: 1
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                require: true,
            },
            rating: {
                type: Number,
                require: true,
            },
            comment: {
                type: String,
                require: true,
            },
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)