const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },

    lastName: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
     Univ_Roll_no: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32,
        unique: true
    },
    FatherName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    MotherName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        unique: true
    },
    cgpa: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    High_School: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    Secondary_School: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    image: {
        type: String,
        trim: true,
        maxLength: 100,
        // required: true,
        
    },
    backlog:{
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    resume:{
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        
    },
    isPhoneVerified: {
        type: Boolean,
        trim: true,
        default: false
    },

    isEmailVerified: {
        type: Boolean,
        trim: true,
        default: false
    },
    
    phone: {
        type: String,
        trim: true,
        maxLength: 10,
        minLength: 10,
        sparse:true,
        default: null
    },

    password: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },
    country:{
            type: String,
            trim: true,
            maxLength: 100,
    },

    signUpMethod: {
        type: String,
        enum: ['custom', 'google']
    },

}, {timestamps: true});

userSchema.methods.generateAuthToken = function(){
    const payload = {
        _id : this._id,
        firstName : this.firstName,
        lastName: this.lastName,
        country: this.country,
        email: this.email,
        phone: this.phone,
        FatherName : this.FatherName,
        MotherName: this.MotherName,
        Univ_Roll_no: this.Univ_Roll_no,
        cgpa: this.cgpa,
        High_School: this.High_School,
        Secondary_School: this.Secondary_School,
        backlog: this.backlog,
        resume:this.resume,
        isPhoneVerified: this.isPhoneVerified,
        isEmailVerified: this.isEmailVerified
    }
   
    const token = jwt.sign(payload, 'Secret', {expiresIn: '1d'});
    return token;
}
module.exports = mongoose.models.User || mongoose.model("User", userSchema);