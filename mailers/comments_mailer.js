const nodeMailer=require('../config/nodemailer');


//df454f35ff3cb56fbea5467dd390893418f6199b
exports.newComment =(comment) =>{
console.log(comment)
let htmlString =nodeMailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'xyz@gmail.com',
        to: comment.user.email,
        subject:"new comment published",
        html:htmlString
    }, (err,info)=>{
        if(err)
        {
            console.log('errpr',err);
            return;
        }
        console.log('message sent');
        return;
    });
}