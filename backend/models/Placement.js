const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const placementSchema = new Schema({
    email: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },
    signUpMethod: {
        type: String,
        enum: ['custom', 'google']
    },

}, {timestamps: true});

placementSchema.methods.generateAuthToken = function(){
    const payload = {
        _id : this._id,
        email: this.email,
    }
   
    const token = jwt.sign(payload, 'Secret', {expiresIn: '1d'});
    return token;
}
module.exports = mongoose.models.Placement || mongoose.model("Placement", placementSchema);