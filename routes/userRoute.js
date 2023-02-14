const express = require("express");
const router = express.Router();
const { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser,refreshToken } = require("../controllers/userController")
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")


router.route("/user/sign-up").post(createUser);

router.route("/user/sign-in").post(loginUser);

router.route("/user/update/:id").put(updateUser);

router.route("/user/delete/:id").delete(authMiddleware, deleteUser)

router.route("/user/getAll").get(authMiddleware, getAllUser)

router.route("/user/getDetail/:id").get(authUserMiddleware, authMiddleware, getDetailUser)

// router.route("/user/refresh-token").post(refreshToken)



module.exports = router