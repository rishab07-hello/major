const express = require('express');

let router = express.Router();

const { signup, signin, signout, changeResume,allStudentDetails,allCompanyDetails,allNoticeDetails,createdatabase} = require('../controllers/auth');

const { googleAuth } = require('../controllers/auth/social/google');
// User
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/changeResume', changeResume);
router.get('/getAllStudentDetails', allStudentDetails);
router.post('/social/google', googleAuth);
// company
router.get('/getAllCompanydetails', allCompanyDetails);
router.post('/createdatabase', createdatabase);

// notice
router.get('/getAllNoticedetails',allNoticeDetails);


module.exports = router;