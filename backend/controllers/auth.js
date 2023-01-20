const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const error = require('../utils/error');
const Notice = require('../models/Notice');
// sign up the current student.
exports.signup = async (req, res) => {
    const emailCheck = await User.find({'email': req.body.email});

    if(!(_.isEmpty(emailCheck))) return res.status(409).json(error(["email already in use"]));
    
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        FatherName: req.body.FatherName,
        MotherName: req.body.MotherName,
        Univ_Roll_no: req.body.Univ_Roll_no,
        cgpa: req.body.cgpa,
        High_School: req.body.High_School,
        Secondary_School: req.body.Secondary_School,
        resume: req.body.resume,
        backlog: req.body.backlog,
        countryCode: req.body.countryCode,
        password: req.body.password,
        signUpMethod: 'custom'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.cookie("token", token, {expires: new Date(Date.now() + 6048000), httpOnly: true});
    
    user = await User.findById(user._id);

    res.json({
        message: `Created new user: ${user._id}`,
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}
// sign in the current user
exports.signin = async (req, res) => {  
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(404).json(error(["invalid username or password"]));

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).json(error(["invalid username or password"]));

    const token = user.generateAuthToken();

    res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});

    res.json({
        message: "Login Successful",
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}
// signout the current student
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signout",
        response: {}
    })
}
// change the resume of current login student
exports.changeResume = async(req,res) =>{
    let q=req.body.resume;
    await User.updateOne({ _id: req.body.id},{$set: {resume: req.body.resume}},(err,doc)=>{
         if(err)console.log("error");
    })
    res.json({
        message: "Resume updated",
        response: {q}
    })
}
// return all student details from the database
exports.allStudentDetails= (req,res) =>{
    User.find({}, function(err, result) {
       if(err)
       console.log("error in geting details of student in fetch");
       else{
       console.log("success in fecting data");
       res.json({
        message: "we have find all student here",
        response: {result}
    })
    }
   })
}
// return all company avaliable for drive
exports.allCompanyDetails= (req,res) =>{
    Company.find({}, function(err, result) {
       if(err)
       console.log("error in geting details of company in fetch");
       else{
       console.log("success in fetching data of company");
       res.json({
        message: "we have find all company here",
        response: {result}
    })
    }
   })
}
// return all notice posted by the TPO
exports.allNoticeDetails= (req,res) =>{
    Notice.find({}, function(err, result) {
       if(err)
       console.log("error in geting details of Notice in fetch");
       else{
       console.log("success in fetching data of notice");
       res.json({
        message: "we have find all company here",
        response: {result}
    })
    }
   })
}
// Upload the drive details in database
exports.createdrivepost= async(req,res) =>{
    let newcompany= new Company({
        Company_Name: req.body.Company_Name,
        Role: req.body.Role,
        CTC: req.body.CTC,
        company_Role_Description: req.body.company_Role_Description,
        RequiredCgpa: req.body.RequiredCgpa,
        Required_high_school: req.body.Required_high_school,
        Required_secondary_school: req.body.Required_secondary_school,
        Required_backlog: req.body.Required_backlog,
    });
    await newcompany.save();
    res.json({
        message:"drive uploaded successfully"
    });
    
}
// register the student for the drive
exports.registerstudent= async(req,res) =>{
  let studentid=req.body.studentid
  let resumeofstudent=req.body.resume
  let companyid=req.body.companyid
  let required_backlog=req.body.Required_backlog
  let backlog=req.body.student_backlog
  let high_school=req.body.student_high_school
  let Required_high_school=req.body.Required_high_school
  let Secondary_School=req.body.student_secondary_school
  let Required_secondary_school=req.body.Required_secondary_school
  let cgpa=req.body.student_cgpa
  let required_cgpa=req.body.RequiredCgpa
  const studentapplied= await Company.countDocuments({_id:companyid,Student_Applied:{$in: [studentid]}})
  if(studentapplied>0){
      res.json({
        message:"Student have Already applied for this  Job post",
        result:-1
      })
  }
  else if(backlog<=required_backlog && high_school>=Required_high_school && Secondary_School>=Required_secondary_school && cgpa>=required_cgpa)
  {
    Company.updateOne({_id:companyid},{$push: {Student_Applied:studentid,Student_Applied_resume:resumeofstudent}},function(err,result){
        if(err)
        console.log(err)
        else{
           User.updateOne({_id:studentid},{$push: {Company_Applied: {$each:[companyid]}}},function(err,result){
            res.json({
                message:"Student have successfully applied for drive",
                result:0
               })
           });
            
        }
      }) 
   }
   else{
        res.json({
                    message:"Student is not eligible for the job",
                    result:1
             })
        }
}
// check if student have already register from drive or not
exports.checkRegister=(req,res)=>{
    let studentid=req.body.studentid
    let companyid=req.body.companyid
    Company.countDocuments({_id:companyid,Student_Applied:{$in: [studentid]}},function(err,result){
        if(err){
            console.log("error in finding");
        }
        else{
            res.json({
                message:"i am here finding task",
                result:{result}
               })
        }
    })
}
// return student applied to xyz company
exports.check_which_student_Register=async(req,res)=>{
    let companyid=req.body.companyid;
    let ans=[];
     var y=await Company.find({_id:companyid})
     array=y[0].Student_Applied;
     for (const element of array){
         const a=await User.find({_id:element})
         ans.push(a);
     }     
    res.json({
        message:"This student have applied to this company",
        result: ans
       })     
}
// return all student details who have applied for drive along with resume
exports.student_details_along_with_resume=async(req,res)=>{
      let companyid=req.body.companyid;
      let details=[]
     const y=await Company.findOne({_id:companyid});
     var student_applied=y.Student_Applied.toObject();
     var student_resume=y.Student_Applied_resume.toObject();
     var c=0;
     for (const element of student_applied){
          let student=await User.findOne({_id:element}).lean();
          console.log("original"+student_resume[c])     
        var t=student_resume[c]
        student.resume=t;
        console.log("now"+student.resume)
        c=c+1;
        details.push(student)
     }
     res.json({
        message:"Details of student who have applied to this company",
        result: details
       })  
}