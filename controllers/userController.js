const userSer = require("../service/userSer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


// Create
const createUser = catchAsyncErrors(async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        let isCheckEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        isCheckEmail.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'Error',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await userSer.createUserSer(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        })
    }

})


// login
const loginUser = catchAsyncErrors(async (req, res) => {
    try {
        const { email, password } = req.body
        let isCheckEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        isCheckEmail.test(email)
        if (!email || !password) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is email'
            })
        }
        const response = await userSer.loginUserSer(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        })
    }
})


//update
const updateUser = catchAsyncErrors(async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if (!userId) {
            return res.status(400).json({
                status: "Error",
                message: "The ID is not defined"
            })
        }

        console.log('userId', userId);
        const update = await userSer.updateUserSer(userId, data)
        return res.status(200).json({
            message: true,
            update
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
})



// Delete 
const deleteUser = catchAsyncErrors(async (req, res) => {
    try {
        const userID = req.params.id
        const token = req.headers
        if (!userID) {
            return res.status.json({
                status: "Error",
                message: "The userID does not exits"
            })
        }
        const response = await userSer.deleteUserSer(userID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        })
    }
})


// Get All User 
const getAllUser = catchAsyncErrors(async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await userSer.getAllUserSer(Number(limit), Number(page))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        })
    }
})


// Get Detail User
const getDetailUser = catchAsyncErrors(async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status.json({
                status: "Error",
                message: "The userID does not exits"
            })
        }
        const response = await userSer.getDetailUserSer(userID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        })
    }
})


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,


}