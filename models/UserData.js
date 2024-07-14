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
  static insert(data, callback) {
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
      console.log("insode mail", info);
      if (error) {
        console.error("Error sending mail:", error);
        return callback(error); // Correctly return the error to the callback
      }
    });
    console.log("hii");
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
            console.log("insode mail", info);
            if (error) {
              console.error("Error sending mail:", error);
              return callback(error); // Correctly return the error to the callback
            } else {
              console.log("Email sent: " + info.response);
              return callback(null, { message: "Done", success: true });
            }
          });
          console.log("call");
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
    con.query("SELECT * FROM formDetails", (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    });
  }

  static async payment(data, callback) {
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
            <title>Payment Receipt</title>
            <style>
                /* Style for the container */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    background-color: #f9f9f9;
                }
        
                /* Style for the header */
                .header {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
        
                /* Style for the message */
                .message {
                    margin-bottom: 20px;
                }
        
                /* Style for the transaction details */
                .transaction-details {
                    border: 1px solid #ccc;
                    padding: 10px;
                    background-color: #fff;
                }
        
                /* Style for the action button */
                .action-button {
                    display: block;
                    width: 100%;
                    text-align: center;
                    background-color: green;
                    color: white !important;
                    padding: 10px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
        
                /* Style for the footer */
                .footer {
                    text-align: center;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    <p>Dear ${data.firstName} ${data.lastName},</p>
                    <p>Thank you for submitting your application for the Canada eTA. We are pleased to inform you that your application has been successfully processed and submitted for assessment. Our team aims to approve all applications within 24-48 hours. Once your application has been approved, you will receive an email from the Canada Immigration Authorities confirming your Canada eTA approval.</p>
                </div>
                <div class="transaction-details">
                    <p><strong>Transaction ID:</strong> ${data.id}</p>
                    <p><strong>Transaction Date:</strong> ${new Date()}</p>
                    <p><strong>Temporary Application Number (not for eTA status):</strong> ${
                      data.ID
                    }</p>
                    <p><strong>Item 1:</strong>Canada eTA</p>
                    <p><strong>Cost:</strong> $${data.amount} USD</p>
                    <p><strong>Charges on your card will appear as:</strong> CANADA ETA</p>
                </div>
                <div class="footer">
                    <p>If you did not authorize this transaction, please inform us by replying to this email.</p>
                    <p>IP Address: ${data.ip}</p>
                    <p>If you have not received a response from us within 24 hours, please do not hesitate to contact us via email and reference your temporary application number.</p>
                <p>If you want to apply another applicant </p>
                 <a href="https://main--form-site-bbb.netlify.app" class="button">APPLY ETA NOW</a>
                    </div>
                <div class="add">
          <p>Best regards,</p>
          <p>Customer Service Dept.</p>
           <p>Canada-ETA-Service</p>
          <p>If you did not authorize this transaction, please inform us by replying to this email.</p>
      </div>
            </div>
        </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: "Error sending mail" });
      } else {
        return res.json({ message: "Payment Successful", success: true });
      }
    });

    con.query(
      "UPDATE formDetails SET ? WHERE id = ?",
      [data, 0],
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
