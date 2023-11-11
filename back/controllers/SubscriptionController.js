const Subscription = require('../models/Subcriptions.js');
const ContactUs = require('../models/ContactUs.js');
const nodemailer = require('nodemailer');



exports.subscribe = async (req, res) => {

    const { subscriber_email } = req.body;
    const existingSubcriber = await Subscription.findOne({ subscriber_email });

    if (!existingSubcriber) {

        const newSubscriber = new Subscription({ subscriber_email });
        await newSubscriber.save();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetail = {
            from: process.env.EMAIL,
            to: subscriber_email,
            subject: "Pixie Book Store Subscription",
            text: "Subscription successful. You will soon receive updates from us."
        };

        transporter.sendMail(mailDetail, (err) => {
            if (err) {
                res.status(400).json({
                    message: err.message
                })

            } else {
                res.status(201).json({
                    message: "Subscription successful...",
                    mailDetail
                })
            }
        });

    } else {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetail = {
            from: process.env.EMAIL,
            to: subscriber_email,
            subject: "Pixie Book Store Subscription",
            text: "You have already subscribed. We will be sending you updates."
        };

        transporter.sendMail(mailDetail, (err) => {
            if (err) {
                res.status(400).json({
                    message: err.message
                })

            } else {
                res.status(201).json({
                    message: "Already subscribed...",
                    mailDetail
                })
            }
        })
    }

}




exports.contact = async (req, res) => {
    try {
        
    const { fullName, contact_email, subject, message_details } = req.body;
    const newContact = new ContactUs({ fullName, contact_email, subject, message_details });
    await newContact.save();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailDetail = {
        from: process.env.EMAIL,
        to: contact_email,
        subject: "Pixie Book Store Contact Request",
        text: "Thank you for contacting us. We will get back to you soon."
    };

    transporter.sendMail(mailDetail, (err) => {
        if (err) {
            res.status(400).json({
                message: err.message
            })

        } else {
            res.status(201).json({
                message: "Thank you for contacting us...We will get back to you soon!!",
                mailDetail
            })
        }
    });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
    
}

exports.getContactUsDetail = async (req, res) => {
    try {
        const allContacUsDetail = await ContactUs.find();
        res.status(200).json({
            message: "All contact messages fetched successfully...",
            allContacUsDetail
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}