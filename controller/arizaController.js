const Ariza = require("../models/ariza")
// const jwt  = require("jsonwebtoken")
// const config = require("../config/config")

exports.register = async (req, res) => {
    try {
        const result = new Ariza({
            name: req.body.name,
            surename: req.body.surename,
            father_name: req.body.father_name,
            phone_number: req.body.phone_number,
            passport_seria_number: req.body.passport_seria_number,
            passport_jshir: req.body.passport_jshir,
            passport_location: req.body.passport_location,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            region: req.body.region,
            city: req.body.city,
            street: req.body.street,
            home_number: req.body.home_number,
            finished_study: req.body.finished_study,
            country: req.body.country,
            university: req.body.university,
            study_type: req.body.study_type,
            study_lang: req.body.study_lang,
            study_level: req.body.study_level,
            facultet: req.body.facultet,
            checked: req.body.checked,
            status: req.body.status,
            bio_img: `http://localhost:4000/${req.file.path.slice(7)}`
        })
        result.save()
        res.status(200).json({ data: result })
    } catch (e) {
        console.log('err', e)
    }
}


exports.login = async (req, res, next) => {
    const { name, phone_number } = req.body;
    if (!name && !phone_number) {
        res.json({
            status: false,
            message: "Fill up all"
        })
    }
    if (!name) {
        res.json({
            status: false,
            message: "Email is not defined"
        })
    }
    if (!phone_number) {
        res.json({
            status: false,
            message: "Password is not defined"
        })
    }

    const user = await Ariza.findOne({ name: name }).select("phone_number");
    if (!user) {
        res.json({
            status: false,
            message: "Email or Password is wrong"
        })
    }
    // let payload = { subject: user._id }
    // let token = jwt.sign(payload, config.JWT_SECRET)
    // res.status(200).json({
    //     token
    // })
    res.json({
        status: true,
        message: "Success"
    })


};




exports.getById = async (req, res) => {
    try {
        const result = await Ariza.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'err')
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await Ariza.find({}).sort({ date: -1 })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.updateAriza = async (req, res, next) => {
    try {
        const updateA = await Ariza.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateA);
    } catch (err) {
        next(err);
    }
};

exports.getDelete = async (req, res) => {
    try {
        const result = await Ariza.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({data: []})
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.getFilter = async(req, res, next)=>{
    try {
        const result = await Ariza.find({}).select({talimDarajasi: 1, davlat: 1, unversitet: 1, fakultet: 1}).count()
        res.json(result)
    } catch (err) {
        next(err)
    }
}
