const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const companySchema = new Schema({
    Company_Name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    Role: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
     CTC: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32,
        required: true,
    },
    RequiredCgpa: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    Required_high_school: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    Required_secondary_school: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
    },
    Required_backlog: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    company_Role_Description: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
    },
    signUpMethod: {
        type: String,
        enum: ['custom', 'google']
    },
    CreatedAt:{
       type: Date,
       default: Date.now
    },
    Student_Applied:[{
        type:Array,
        default:""
    }],
    Student_Applied_resume:[{
        type:Array,
        default:""
    }],
    Student_Placed:[{
        type:Array,
        default:""
    }],
    active:{
        type:String,
        default:"active"
    }
},{collection:'company'});

module.exports = mongoose.models.Company || mongoose.model("Company", companySchema);