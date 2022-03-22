const mongoose = require('mongoose')



const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name required"],
        unique: true,
        lowercase: true,
        
    },
    fullName: {
        type: String,
        required: [true, "fullname required"],
        trim: true
    },
    logoLink: {
        type: String,
        required: [true, "logolink required"],
        lowercase: true,
        trim : true

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Collage', collegeSchema)