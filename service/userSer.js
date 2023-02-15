const User = require("../models/userModel")
const { genneralAccessToken, genneralRefreshToken, accessToken, refreshToken } = require('./jwtSer');
const bcrypt = require("bcrypt")


//create
const createUserSer = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkNameUser = await User.findOne({
                name: name,
            })

            if (checkNameUser !== null) {
                resolve({
                    status: "Error",
                    message: "Your name already exists"
                })
            }

            const CheckEmailUser = await User.findOne({
                email: email
            })

            if (CheckEmailUser !== null) {
                resolve({
                    status: "Error",
                    message: "Your email already exists"
                })
            }

            const checkPhoneUser = await User.findOne({
                phone: phone
            })

            if (checkPhoneUser !== null) {
                resolve({
                    status: "Error",
                    message: "Your phone already exists"
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createUser) {
                return resolve({
                    success: true,
                    data: createUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


//login
const loginUserSer = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: false,
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    success: 'false',
                    message: 'The password or user is incorrect'
                })
            }

            const access_Token = await accessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })


            const refresh_Token = await refreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })


            resolve({
                success: 'true',
                data: checkUser,
                access_Token,
                refresh_Token
            })
        } catch (error) {
            reject(error)
        }
    })
}

//update
const updateUserSer = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "Error",
                    message: "The user is not defined"
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                success: true,
                message: "Update user success!",
                data: updateUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

// Delete 
const deleteUserSer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "Error",
                    message: "The checkUser is not defined"
                })
            }
            await User.findByIdAndRemove(id)
            resolve({
                success: true,
                message: "Delete User Success",
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Get All User
const getAllUserSer = (limit = 8, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.count()
            const getAllUser = await User.find().limit(limit).skip(limit * page)
            resolve({
                success: true,
                data: getAllUser,
                total: totalUser,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalUser / limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}

//Get Detail User
const getDetailUserSer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: "Error",
                    message: "The checkUser is not defined"
                })
            }

            resolve({
                success: true,
                data: user
            })
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    createUserSer,
    loginUserSer,
    updateUserSer,
    deleteUserSer,
    getAllUserSer,
    getDetailUserSer,
}