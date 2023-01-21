const express = require('express');

let router = express.Router();

const { signup, signin, signout, changeResume,allStudentDetails,allCompanyDetails,allNoticeDetails,createdrivepost,registerstudent,checkEligible
,check_which_student_Register,student_details_along_with_resume,deletepost,currentCompanyInfo} = require('../controllers/auth');

const { googleAuth } = require('../controllers/auth/social/google');
// User
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/changeResume', changeResume);
router.get('/getAllStudentDetails', allStudentDetails);
router.post('/social/google', googleAuth);
router.post('/registerstudent', registerstudent);
router.get('/checkEligible',checkEligible);
router.get('/currentCompanyInfo',currentCompanyInfo);
// TPO
router.get('/getAllCompanydetails', allCompanyDetails);
router.post('/createdrivepost', createdrivepost);
router.get('/studentRegister',check_which_student_Register);
router.get('/liststudentRegister',student_details_along_with_resume);
router.get('/deletepost',deletepost);

// notice
router.get('/getAllNoticedetails',allNoticeDetails);


module.exports = router;