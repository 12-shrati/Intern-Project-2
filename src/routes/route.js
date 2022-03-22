const express = require('express');
const router = express.Router();
const collageController = require('../controllers/collageController')
const internController = require('../controllers/internController')




router.post('/BASE_URL/functionup/colleges', collageController.createCollage)

router.post('/functionup/interns', internController.createIntern)

router.get('/functionup/collegeDetails', collageController.getCollageDetails)



module.exports = router;



