const express = require("express");
const router = express.Router();
const { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser,refreshToken } = require("../controllers/userController")
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")


router.route("/user/sign-up").post(createUser);

router.route("/user/sign-in").post(loginUser);

router.route("/user/update/:id").put(updateUser);

router.route("/user/delete/:id").delete(authMiddleware, deleteUser)

router.route("/user/getAllUser").get( getAllUser)

router.route("/user/getDetailUser/:id").get(authUserMiddleware,  getDetailUser)

// router.route("/user/refresh-token").post(refreshToken)



module.exports = router