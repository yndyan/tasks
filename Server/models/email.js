// 'use strict';
const nodemailer = require('nodemailer');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rastayndyan', //
        pass: 'ipsilon0'  //
    }
});

//generate token, check it exist in db, if not, send to user

module.exports.sendEmail =  function(address, token){
    const mailOptions = {
        from: 'projectApp@gatewas.com', // sender address
        to: address, // list of receivers
        subject: 'Email verification', // Subject line
        text: `http://localhost:4200/user/verifyemail/${token}` // TODO add reading current address
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};
