const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");




// send mail
router.post("/register",  (req, res) => {
    const {name} = req.body;
    const { email } = req.body;
    const {phoneno} = req.body;
    const {empid} = req.body;
  

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Invoice from EZILine",
            html: `
            <h1>Invoice</h1> 
            
            <h5>Name : ${name}</h5>
            <h5>Email : ${email}</h5>
            <h5>Ph : ${phoneno}</h5>
            <h5>EMP-ID : ${empid}</h5>
            
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(201).json({status:401,error})
    }
});


module.exports = router;