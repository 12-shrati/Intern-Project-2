const mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name required"],
        trim: true
    },
    email: {
        type: String,
        required:[true, "Email required"],
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: [true,"mobile number required"],
        match:/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
        unique: true

    },
    collegeId: {
        type: objectId,
        required:[true,"collageId required"],
        ref: 'Collage'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)
