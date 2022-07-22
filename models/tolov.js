const mongoose = require("mongoose")

const tolovSchema = mongoose.Schema(
    {
        img: String,
        date: {type: Date, default: Date.now()} 
    }
)
module.exports = mongoose.model("Tolov", tolovSchema)