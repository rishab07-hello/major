const express = require('express');

let router = express.Router();

const { signup, signin, signout, changeResume,allStudentDetails,allCompanyDetails,allNoticeDetails,createdrivepost,registerstudent,checkRegister
,check_which_student_Register} = require('../controllers/auth');

const { googleAuth } = require('../controllers/auth/social/google');
// User
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/changeResume', changeResume);
router.get('/getAllStudentDetails', allStudentDetails);
router.post('/social/google', googleAuth);
router.post('/registerstudent', registerstudent);
router.get('/checkRegister',checkRegister);
// company
router.get('/getAllCompanydetails', allCompanyDetails);
router.post('/createdrivepost', createdrivepost);
router.get('/studentRegister',check_which_student_Register);

// notice
router.get('/getAllNoticedetails',allNoticeDetails);


module.exports = router;