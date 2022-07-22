const Tolov = require("../models/tolov")


exports.register = async (req, res) => {
    try {
        const result = new Tolov({
            img: `http://localhost:4000/${req.file.path.slice(7)}`
        })
        result.save()
        res.status(200).json({ data: result })
    } catch (e) {
        console.log('err', e)
    }
}

exports.getById = async (req, res) => {
    try {
        const result = await Tolov.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'err')
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await Tolov.find({}).sort({ date: -1 })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'er')
    }
}


exports.getDelete = async (req, res) => {
    try {
        const result = await Tolov.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'er')
    }
}
