const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// ------------------------------------ MongoDB coonecting ----------------------------------
const MongoURI = "mongodb://localhost:27017/ish"
mongoose
    .connect(MongoURI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(`MongoDB Connected`);
    }).catch((err)=>{console.log("err")})



app.use(express.static("public"))
//  ==================================== A P I ==============================
app.use("/students", require("./routes/arizaRoutes"))


app.use("/tolov", require("./routes/tolovRoutes"))








app.listen(4000, console.log("4000 port started"))
