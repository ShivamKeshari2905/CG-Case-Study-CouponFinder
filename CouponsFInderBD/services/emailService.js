let nodemailer = require('nodemailer');  
exports.sendEmailToSubscriber = async (receiverEmail, msg = null) => {
    console.log('Code reached');
    try {
    // We shall first create ther transporter
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: '',//Add Your Email
            pass: '',//Add Your Password
        },
        secure: true, // upgrades later with STARTTLS -- change this based on the PORT
      });
    
    // We shall define our mail data
    const mailData = {
        from: '',//Add Email
        to: receiverEmail,
        subject: 'Subscription to My Newsletter',
        text: '',
        html: '<b>Hey there! </b><br> Thanks for subscribing! We will update all about our offers on email!<br/>',
    };

    // start sending the email
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.log('There was an error in sending email to the client', mailData.to, error);
            return 400;
        };
        console.log(`Email sent successfully to ${mailData.to}`);
        return 200;
    });

}catch(e) {
    console.log('error in catch block', e);
    return 400;
}
};