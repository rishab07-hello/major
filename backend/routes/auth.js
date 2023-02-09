const express = require('express');

let router = express.Router();

const { signup, signin, signout, changeResume,allStudentDetails,allCompanyDetails,allNoticeDetails,createdrivepost,registerstudent,checkEligible
,check_which_student_Register,student_details_along_with_resume,deletepost,currentCompanyInfo,appliedDrive,placementSignIn,placementSignUp,
viewstudent,jobappliedDrive,StudentPlaced,PostPlacedStudent,TotalStudentPlaced} = require('../controllers/auth');

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
router.get('/appliedDrive',appliedDrive)
router.get('/TotalStudentPlaced',TotalStudentPlaced)
// TPO
router.post('/placementsignin', placementSignIn);
router.post('/placementsignup', placementSignUp);
router.get('/getAllCompanydetails', allCompanyDetails);
router.post('/createdrivepost', createdrivepost);
router.get('/studentRegister',check_which_student_Register);
router.get('/liststudentRegister',student_details_along_with_resume);
router.post('/deletepost',deletepost);
router.get('/viewstudent',viewstudent);
router.get('/jobappliedDrive',jobappliedDrive)
router.post('/StudentPlaced',StudentPlaced)
router.post('/PostPlacedStudent',PostPlacedStudent)

// notice
router.get('/getAllNoticedetails',allNoticeDetails);


module.exports = router;