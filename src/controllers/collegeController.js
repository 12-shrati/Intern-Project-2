const collegeModel = require("../models/collegeModel")
const internModel = require('../models/internModel')

const isValidRequestBody = function (data) {
  return Object.keys(data).length > 0
}



const createCollege = async function (req, res) {
  try {
    let data = req.body
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "enter valid parameters" })
    }
    if (!(data.name)) {
      return res.status(400).send({ status: false, msg: " name required" })
    }
    if (data.name.trim().length == 0) {
      return res.status(400).send({ status: false, msg: "fill the name " })
    }
    let duplicateName = await collegeModel.findOne({ name: data.name })
    if (duplicateName)
      return res.status(400).send({ status: false, msg: "college Name is already present" })

    if (!(data.fullName)) {
      return res.status(400).send({ status: false, msg: " fullname required" })
    }
    if (data.fullName.trim().length == 0) {
      return res.status(400).send({ status: false, msg: " fill the fullName " })
    }
    if (!(data.logoLink)) {
      return res.status(400).send({ status: false, msg: "logoLink required" })
    }

    let collegeData = await collegeModel.create(data)
    return res.status(201).send({ status: true, data: { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, isDeleted: false } })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}



let getCollegeDetails = async function (req, res) {
  try {

    let collegeName = req.query.collegeName

    if (!collegeName) {
      return res.status(400).send({ status: false, message: "college name required" })
    }
    let collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false })

    if (!collegeData) {
      return res.status(404).send({ status: false, message: "college not found" })
    }

    let collegeDetails = {
      name: collegeData.name,
      fullName: collegeData.fullName,
      logoLink: collegeData.logoLink,
      interests: []
    }
    let id = collegeData._id
    let internsDetails = await internModel.find({ collegeId: id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

    collegeDetails.interests = internsDetails
    return res.status(200).send({ status: true, data: collegeDetails })

  }

  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails

