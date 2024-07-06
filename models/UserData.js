import con from "../db.js";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@canada-eta-portal.com",
    pass: "ddug ugkf illn ipbd",
  },
});

class UserData {
  static  insert(data, callback) {
    let tempId = "CAN" + Math.floor(Math.random() * 1000000000);
    var mailOptions = {
      from: "info@canada-eta-portal.com",
      to: data.email,
      bcc: "info@canada-eta-portal.com",
      subject: `Incomplete Application - ${data.firstName} ${data.lastName}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: white; /* white background */
              }
              .container {
                  padding: 20px;
                  width: 90%;
                  max-width: 550px;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  background-color: white;
              }
              .header {
                  font-size: 14px;
                  margin-bottom:10px;
              }
              .line {
                  border-top: 1px solid #ccc;
                  margin-bottom: 20px;
              }
              .content {
                  margin-bottom: 20px;
              }
              .footer {
                  font-size: 12px;
                  color: #555;
                  border-top: 1px solid #ccc;
                  padding-top: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #fff;
                  background-color: #FF474C;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 10px;
              }
              /* Responsive Styles */
              @media only screen and (max-width: 600px) {
                  .container {
                      padding: 10px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">Dear ${data.firstName} ${data.lastName},</div>
              <div class="content">
                  <p>You have an incomplete eTA application.</p>
                  <p>Your temporary application reference is: ${tempId}
                  <p>Please click on the below link to resume your application:</p>
                  <a href="https://main--form-site-bbb.netlify.app/register/${tempId}" class="button">RESUME APPLICATION</a>
                  <p>Let us know if you require any assistance.</p>
                  <p>Please apply at least (72) hours prior to your travel to Canada to allow time for an eTA to be issued.</p>
              </div>
              
              <div class="content">
                  <p>Regards,</p>
                  <p>Customer Service Dept.<br>eTA Processing Team</p>
              </div>
              <div class="footer">
                  <p>Confidentiality Notice: This email and any attachments are confidential and may also be privileged. If you have received this message by mistake, please contact us immediately and then delete the message from your computer. Any review, retransmission, dissemination or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited. To provide you with the best online experience, our websites are using cookies.</p>
              </div>
          </div>
      </body>
      </html>
      `,
    };
  
    
     transporter.sendMail(mailOptions, function (error, info) {
      console.log('insode mail', info)
      if (error) {
        console.error('Error sending mail:', error);
        return callback(error); // Correctly return the error to the callback
      } else {
        console.log('Email sent: ' + info.response);
        return callback(null, tempId);
      }
      
    });
    console.log('hii')
    con.query(
      "INSERT INTO formDetails SET ?",
      { ...data, id: tempId },
      (error, results) => {
        if (error) {
          return callback(error);
        }
        if (results) {
          var mailOptions = {
            from: "info@canada-eta-portal.com",
            to: data.email,
            bcc: "info@canada-eta-portal.com",
            subject: `Incomplete Application - ${data.firstName} ${data.lastName}`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: white; /* white background */
                    }
                    .container {
                        padding: 20px;
                        width: 90%;
                        max-width: 550px;
                        margin: 0 auto;
                        border: 1px solid #ccc;
                        background-color: white;
                    }
                    .header {
                        font-size: 14px;
                        margin-bottom:10px;
                    }
                    .line {
                        border-top: 1px solid #ccc;
                        margin-bottom: 20px;
                    }
                    .content {
                        margin-bottom: 20px;
                    }
                    .footer {
                        font-size: 12px;
                        color: #555;
                        border-top: 1px solid #ccc;
                        padding-top: 20px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #fff;
                        background-color: #FF474C;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    /* Responsive Styles */
                    @media only screen and (max-width: 600px) {
                        .container {
                            padding: 10px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Dear ${data.firstName} ${data.lastName},</div>
                    <div class="content">
                        <p>You have an incomplete eTA application.</p>
                        <p>Your temporary application reference is: ${tempId}
                        <p>Please click on the below link to resume your application:</p>
                        <a href="https://main--form-site-bbb.netlify.app/register/${tempId}" class="button">RESUME APPLICATION</a>
                        <p>Let us know if you require any assistance.</p>
                        <p>Please apply at least (72) hours prior to your travel to Canada to allow time for an eTA to be issued.</p>
                    </div>
                    
                    <div class="content">
                        <p>Regards,</p>
                        <p>Customer Service Dept.<br>eTA Processing Team</p>
                    </div>
                    <div class="footer">
                        <p>Confidentiality Notice: This email and any attachments are confidential and may also be privileged. If you have received this message by mistake, please contact us immediately and then delete the message from your computer. Any review, retransmission, dissemination or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited. To provide you with the best online experience, our websites are using cookies.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
          };
        
          
           transporter.sendMail(mailOptions, function (error, info) {
            console.log('insode mail', info)
            if (error) {
              console.error('Error sending mail:', error);
              return callback(error); // Correctly return the error to the callback
            } else {
              console.log('Email sent: ' + info.response);
              return callback(null, { message: "Done", success: true });
            }
            
          });
          console.log('call')
        }
        callback(null, tempId);
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

  static findAll(callback) {
    con.query(
      "SELECT * FROM formDetails",
      (error, results) => {
        if (error) {
          return callback(error);
        }
        callback(null, results);
      }
    );
  }
}

export default UserData;
