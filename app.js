const express = require("express");
const app = express();

app.use(express.json())

// Route import
const user = require('./routes/userRoute')

const product = require('./routes/productRoute')

app.use("/api/v1", user)

app.use("/api/v1", product)


module.exports = app;