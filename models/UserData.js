import con from "../db.js";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "anubh896@gmail.com",
    pass: "oafg larv lbgx bhmo",
  },
});

class UserData {
  static insert(data, callback) {
    let tempId = "CAN" + Math.floor(Math.random() * 1000000000);
    con.query(
      "INSERT INTO formDetails SET ?",
      { ...data, id: tempId },
      (error, results) => {
        if (error) {
          return callback(error);
        }
        if (results) {
          console.error('Error start:');
          var mailOptions = {
            from: "info@indiaevisaservices.org",
            to: data.email,
            bcc: "info@indiaevisaservices.org",
            subject: `India Evisa Services- Pending eVisa Application for ${data.firstName} ${data.lastName}`,
            html: `<!DOCTYPE html>
           <html>
           <head>
               <meta name="viewport" content="width=device-width, initial-scale=0.9">
               <style>
                   @media only screen and (max-width: 600px) {
                       .container {
                           width: 80% !important;
                       }
                   }
               </style>
           </head>
           <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
           
           <div class="container" style="max-width: 600px; margin: 0 auto;color: black; padding: 20px; border: 1px solid #ededde; border-top: 3px solid #ff8c1a; ">
           
               <p style="text-align: left; font-size: 90%;">
                   Dear ${data.firstName} ${data.lastName},
                   <br><br>
                   You have an incomplete eVisa application for India.
                   <br><br>
                   Your temporary application reference is: <strong>${tempId}</strong>
               </p>
           <br>
               <p style="text-align: center;">
                   <a href="https://main--form-site-bbb.netlify.app/${tempId}" style="display: inline-block; padding: 15px 60px; background-color:#990000; color: white; text-decoration: none; border-radius: 5px;">Resume Application</a>
               </p>
           <br>
               <p style="text-align: left;font-size: 90%;">
                   Let us know if you require any assistance.
                   <br><br>
                   Click the links to learn more about <a href="https://indiaevisaservices.org/">India eVisa</a> or <a href="https://indiaevisaservices.org/">Frequently Asked Questions</a>.
                   <br><br>
                   Please apply at least four (4) days prior to your travel to India to allow time for the eVisa to be issued.
                   <br><br>
                   Regards,<br>
                   Customer Service Dept.<br>
                   <a href="https://indiaevisaservices.org/" style="color: black;">https://indiaevisaservices.org</a>
               </p>
           <br>
               <p style="font-size: 80%; color: #888;">
                   Confidentiality Notice: This email and any attachments are confidential and may also be privileged. If you have received this message by mistake, please contact us immediately and then delete the message from your computer. Any review, retransmission, dissemination, or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited.
               </p>
           
           </div>
           
           </body>
           </html>
           `,
          };
          
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error('Error sending mail:', error);
              return callback(error); // Correctly return the error to the callback
            } else {
              console.log('Email sent: ' + info.response);
              return callback(null, { message: "Done", success: true });
            }
          });
        }
        callback(null, results);
      }
    );
  }

  static update(id, data, callback) {
    con.query(
      "UPDATE formDetails SET ? WHERE id = ?",
      [data, id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        callback(null, results);
      }
    );
  }

  static findById(id, callback) {
    con.query(
      "SELECT * FROM formDetails WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        callback(null, results[0]);
      }
    );
  }
}

export default UserData;
