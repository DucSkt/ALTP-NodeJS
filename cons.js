const paterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const EMAIL = 'n16dccn057@student.ptithcm.edu.vn';
const PASS_EMAIL = 'hieunguyen020298';
const nodemailer = require('nodemailer');

const sendMail = (Email,planText) =>{
    return new Promise(resolve =>{
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user:  EMAIL,
                pass: PASS_EMAIL
            }
        });
        
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Ai La Trieu Phu',
            to: Email,
            subject: '',
            text: 'You recieved message from ' + EMAIL,
            html: planText
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                if(err) return resolve({err: true, message: err.message});
            } else {
                console.log('Message sent: ' +  info.response);
                
                return resolve({ err: false}); 
            }
        });
    });
};

module.exports = {
    paterEmail : paterEmail,
    sendMail   : sendMail
}