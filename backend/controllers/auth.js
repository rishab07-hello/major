const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const error = require('../utils/error');
const Notice = require('../models/Notice');
const Placement = require('../models/Placement');
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
exports.allStudentDetails= async(req,res) =>{
    let result=await User.find({}).select("-password")   
       res.json({
        message: "we have find all student here",
        response: {result}
       })

}
// return all company avaliable for drive
exports.allCompanyDetails= (req,res) =>{
    let result=Company.find({active:"active"}, function(err, result) {
       if(err)
       console.log("error in geting details of company in fetch");
       else{
       console.log("success in fetching data of company");
       res.json({
        message: "we have find all active company here",
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
        message: "we have find all notice here",
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
     newcompany.save((err, result) => {
        if (err) console.log(err);
        else {
            res.json({
                message:"drive uploaded"
            })
        }})
        
    
    
}
// register the student for the drive
exports.registerstudent= async(req,res) =>{
    let student=req.query.studentdetails
    let company=req.query.companydetails
  let studentid=student._id
  let companyid=company._id
  let backlog=student.backlog
  let high_school=student.High_School
  let cgpa=student.cgpa
  let Secondary_School=student.Secondary_School
  let required_cgpa=company.RequiredCgpa
  let required_backlog=company.Required_backlog
  let Required_secondary_school=company.Required_secondary_school
  let Required_high_school=company.Required_high_school
  let resumeofstudent=student.resume
//   console.log(backlog+" "+required_backlog)
//   console.log(high_school+" "+Required_high_school)
//   console.log(Secondary_School+" "+Required_secondary_school)
//   console.log(cgpa+" "+required_cgpa)
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
// check if student is eligible for drive
exports.checkEligible=(req,res)=>{
    let student=req.query.studentdetails
    let company=req.query.companydetails
  
    let backlog=student.backlog
    let high_school=student.High_School
    let cgpa=student.cgpa
    let Secondary_School=student.Secondary_School
    let required_cgpa=company.RequiredCgpa
    let required_backlog=company.Required_backlog
    let Required_secondary_school=company.Required_secondary_school
    let Required_high_school=company.Required_high_school

  if(backlog<=required_backlog && high_school>=Required_high_school && Secondary_School>=Required_secondary_school && cgpa>=required_cgpa)
  {
    res.json({
        message:"eligible",
        result:1
    })
}
else{
    res.json({
        message:" not eligible",
        result:0
    })
}
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
      let companyid=req.query.id.currentIdofCompany;
      let details=[]
     const y=await Company.findOne({_id:companyid});
     var student_applied=y.Student_Applied.toObject();
     var student_resume=y.Student_Applied_resume.toObject();
     var c=0;
     for (const element of student_applied){
        let student=await User.findOne({_id:element}).select("-password").select("-_id").select("-isPhoneVerified").select("-isEmailVerified").select("-signUpMethod").select("-createdAt").select("-updatedAt").select("-__v").select("-Company_Applied").lean();    
        var t=student_resume[c]
        student.resume=t;
        c=c+1;
        details.push(student)
     }
     res.json({
        message:"Details of student who have applied to this company",
        result: details
       })  
}
// return details to xyz student
exports.viewstudent=async(req,res)=>{
let result=await User.findOne({_id:req.query.id})
res.json({
    message:" i am here",
    result:result
})
}  
// delete the drive uploaded by the tpo make active 1
exports.deletepost= async(req,res) =>{
    let companyid=req.body.companyid;
    
     await Company.updateOne({_id:companyid},{$set: {active:"passive"} },function(err, result){
        if(err)
        console.log("Eroor in delete post");
     })
     res.json({
        message:"drive have become inactive"
     })
}
// return current company details
exports.currentCompanyInfo=async(req,res)=>{
    await Company.findOne({_id:req.query.id.currentIdofCompany},function(err,result){
        if(err){
            console.log("Error in finding current company")
        }
        res.json({
            message:"i have current company details",
            result:{result}
        })
    }) 
}
exports.appliedDrive=async(req,res)=>{
    let studentid=req.query.id
    let result=await User.findOne({_id:studentid})
    var applied=result.Company_Applied
    var totalcompanyapplied=[]
    for (const element of applied){
        let company=await Company.findOne({_id:element}).lean()
        totalcompanyapplied.push(company)
    }
    res.json({
           message:" i have found all applied company",
           result: totalcompanyapplied
    })
}
// tpo login
exports.placementSignIn = async (req, res) => {  
    let user = await Placement.findOne({email : req.body.email});
    if(!user) return res.status(404).json(error(["Invalid username or password"]));
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
// tpo signup
exports.placementSignUp = async (req, res) => {
    const emailCheck = await Placement.find({'email': req.body.email});

    if(!(_.isEmpty(emailCheck))) return res.status(409).json(error(["email already in use"]));
    
    let user = new Placement({
        email: req.body.email,
        password: req.body.password,
        signUpMethod: 'custom'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.cookie("token", token, {expires: new Date(Date.now() + 6048000), httpOnly: true});
    user = await Placement.findById(user._id);
    res.json({
        message: `Created new user: ${user._id}`,
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}