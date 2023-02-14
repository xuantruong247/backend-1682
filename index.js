const app = require("./app")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
dotenv.config()


const port = process.env.PORT || 4001


// connect DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connect DB Success!");
    }).catch((err) => {
        console.log(err);
    })

app.listen(port, () => {

    console.log('Server running http//localhost:', port);
})