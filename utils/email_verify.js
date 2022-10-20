const nodemailer = require('nodemailer');
const config = require('../config/app.config.json');
const jwt = require('jsonwebtoken');
const { log_info, log_error, log_success } = require('./logging');

const verifyNewAccount = async (dataAuth) => {
    const token = jwt.sign(
        {
            id_user: dataAuth.id_user,
            nama_pengguna: dataAuth.nama_pengguna,
            message: 'verification'
        }, config.jwt.secret, {expiresIn: '1h'});

    const link = `${config.url}/api/auth/verify-account?token=${token}`;
    message = `<h1>Hi ${dataAuth.nama_pengguna}</h1>
                <p>Click this link to verify your email</p>
                <a href="${link}">${link}</a>`
    
    return emailVerify(dataAuth.email, message);
}

const verifyEmailForgotPassword = async (dataAuth, newPass) => {
    message = `<h1>Hi ${dataAuth.nama_pengguna}</h1>
                <p>Your new password is : <strong>${newPass}<strong></p>
                <p>Please change your password after login</p>`
    
    return emailVerify(dataAuth.email, message);
}

const emailVerify = async (email, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.auth.email,
          pass: config.auth.password_app
        }
      });
      
    var mailOptions = {
        from: config.auth.email,
        to: email,
        subject: 'Email Verification',
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                log_error('Email Verification', error);
            } else {
                log_success('Email Verification', 'Email sent: ' + info.response);
            }
        }
    );
}

module.exports = {emailVerify, verifyNewAccount, verifyEmailForgotPassword};