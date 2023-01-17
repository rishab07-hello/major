const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const NoticeSchema = new Schema({
Author_Name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    Title: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32,
        required: true
    },
Description: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
   
    signUpMethod: {
        type: String,
        enum: ['custom', 'google']
    },
},{collection:'Notice', timestamps: true});

module.exports = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);