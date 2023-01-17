const User = require('../models/User');
const company = require('../models/company');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const error = require('../utils/error');
const Notice = require('../models/Notice');
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
    res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});
    
    user = await User.findById(user._id);

    res.json({
        message: `Created new user: ${user._id}`,
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}

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

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signout",
        response: {}
    })
}
exports.changeResume = (req,res) =>{
    let q=req.body.resume;
    User.updateOne({ _id: req.body.id},{$set: {resume: req.body.resume}},(err,doc)=>{
         if(err)console.log("error");
    })
    res.json({
        message: "Resume updated",
        response: {q}
    })
}
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
exports.allCompanyDetails= (req,res) =>{
    company.find({}, function(err, result) {
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
exports.createdatabase= (req,res) =>{
    const name_of_database=req.body.company_name;
  
    
}