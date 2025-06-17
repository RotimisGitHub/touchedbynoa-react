import express from 'express';
import nodemailer from 'nodemailer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import dotenv from 'dotenv';
import BookingConfirmationEmail from './Emails/BookingConfirmationEmail.component';
dotenv.config();


const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY)
const app = express()
const port = 3001

const development = process.env.REACT_APP_DEV
const index = development === 'yes' ? 'http://localhost:3000' : 'https://touchedbynoa-react.onrender.com'

app.use(express.json())

const AdminEmail = 'rotimi@purplepastures.co.uk';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: AdminEmail,
        pass: process.env.REACT_APP_EMAIL_PASSWORD
    }
});

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Deposit',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${index}/profile`,
        cancel_url: `${index}/cancel`,
        metadata: {
            email: req.body.email
        }
    });

    res.json({ url: session.url });
});

app.post('/api/booking-page', (req, res) => {
    const bookingInformation = req.body

    console.log('type:', typeof bookingInformation)
    console.log("Content:", bookingInformation);

    if (bookingInformation) {
        const emailHTML = ReactDOMServer.renderToStaticMarkup(
            <BookingConfirmationEmail bookingInformation={bookingInformation}/>
        );

        const mailOptions = {
            from: AdminEmail,
            to: bookingInformation.currentUser,
            subject: 'Your Booking Confirmation with us!',
            html: emailHTML,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({error: 'Email failed to send'});
            }

            console.log('Email sent:', info.response);
            res.status(200).json({success: 'Email sent successfully'});
        });
    } else {
        res.status(400).json({error: 'Missing booking information'});
    }
})

app.listen(port, () => console.log('Running on port 3001'));
