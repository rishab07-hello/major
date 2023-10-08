const User = require('../models/User');
const accountSid = "ACddfa6fcdb289e705352f7ae70472c88f";
const authToken = "2695aed9a9f52f5d10271e34702dfdcb";
const client = require('twilio')(accountSid, authToken);
// i am here
const error = require('../utils/error');

exports.sendOtpOnPhone = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send("user not available");

    console.log(user);

    if(user.isPhoneVerified) return res.status(409).json(error(["phone number already verified"]));

    let phoneNumber = `+${user.countryCode + user.phone}`; 
    const service_id = "VA8b66b6b210e7e92686de2a3058273ef3"
    client.verify.services(service_id)
    .verifications
    .create({to: phoneNumber, channel: 'sms'})
    .then(verification => res.json({
        message: `OTP sucessfully sent to ${verification.to}`
    }))
    .catch((err) => {
        console.log(err)
        return res.json(error([err]));
    });
}

exports.verifyOtpPhone = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send("user not available");

    if(user.isPhoneVerified) return res.status(409).json(error(["phone number already verified"]));

    const userPhone = `+${user.countryCode + user.phone}`;

    console.log(req.body);
    console.log(user);
    
    client.verify.services("VA8b66b6b210e7e92686de2a3058273ef3")
    .verificationChecks
    .create({to: userPhone, code: req.body.otp}).then((verification_check) => {
        console.log(verification_check);

        if(!((verification_check.status) === 'approved') || !verification_check.valid) return res.json({
            message: "phone number verification failled",
            response: {
                isOtpValid: verification_check.valid,
                status: verification_check.status,
                isPhoneVerified: user.isPhoneVerified
            }
        })

        user.isPhoneVerified = true;
        user.save();

        const token = user.generateAuthToken();
        res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});

        return res.json({
            message: "Phone successfully verified",
            token: token,
            response: user
        });

    }).catch((err) => {
        return res.json(error([err]));
    });
};

exports.sendOtpOnEmail = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send("user not available");
    
    if(user.isEmailVerified) return res.status(409).json(error(["email already verified"]));
    
    client.verify.services(process.env.TWILIO_VERIFY_SERVICE_ID)
    .verifications
    .create({to: user.email, channel: 'email'})
    .then(verification => res.json({
        message: `OTP sucessfully sent to ${verification.to}`
    }))
    .catch((err)=>{
        res.json(error([err]));
    });
}

exports.verifyOtpEmail = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send("user not available");
    
    if(user.isEmailVerified) return res.status(409).json(error(["email already verified"]));

    client.verify.services(process.env.TWILIO_VERIFY_SERVICE_ID)
    .verificationChecks
    .create({to: user.email, code: req.body.otp})
    .then((verification_check) => {
        if(!((verification_check.status) === 'approved') || !verification_check.valid) return res.json({
            message: "phone number verification failled",
            response: {
                isOtpValid: verification_check.valid,
                status: verification_check.status,
                isEmailVerified: user.isEmailVerified
            }
        })

        user.isEmailVerified = true;
        user.save();

        const token = user.generateAuthToken();
        res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});

        return res.json({
            message: "Email successfully verified",
            token: token,
            response: user
        });
    }).catch((err) => {
        res.json(error([err]));
    })
}; 

