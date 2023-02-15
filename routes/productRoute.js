const express = require("express");
const { createProduct, updateProduct, getDetailProduct, deleteProduct, getAllProduct } = require("../controllers/productController");
const router = express.Router();


router.route("/product/create").post(createProduct);

router.route("/product/update/:id").put(updateProduct);

router.route("/product/getDetailProduct/:id").get(getDetailProduct);

router.route("/product/deleteProduct/:id").delete(deleteProduct);

router.route("/product/getAllProduct").get(getAllProduct);

module.exports = router