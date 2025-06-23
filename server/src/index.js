import express from 'express';
import nodemailer from 'nodemailer';
import React from 'react';
import dotenv from 'dotenv';
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
        const emailHTML = `<div>
            <h2>Your Appointment is Confirmed</h2>

            <p>Dear ${bookingInformation.name},</p>

            <p>
                Thank you for booking with <strong>TouchedByNoa</strong>. We're pleased to confirm your hair appointment.
                Below are the details of your scheduled session:
            </p>

            <table>
                <tbody>
                <tr>
                    <td><strong>Hairstyle:</strong></td>
                    <td>${bookingInformation.hairstyleTitle}</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>${bookingInformation.start}</td>
                </tr>
                <tr>
                    <td><strong>Time:</strong></td>
                    <td>${bookingInformation.start} - ${bookingInformation.end}</td>
                </tr>
                <tr>
                    <td><strong>Duration:</strong></td>
                    <td>${bookingInformation.duration} hour(s)</td>
                </tr>
                <tr>
                    <td><strong>Length:</strong></td>
                    <td>${bookingInformation.length}</td>
                </tr>
                <tr>
                    <td><strong>Thickness:</strong></td>
                    <td>${bookingInformation.thickness}</td>
                </tr>
                </tbody>
            </table>

            ${bookingInformation.hairstyleImage && (
                <div>
                    <img src={bookingInformation.hairstyleImage} alt="Selected hairstyle" />
                </div>
            )}

            <p>
                The location of your appointment will be sent to this email address closer to the date of your appointment.
                Please ensure your contact details are up to date.
            </p>

            <p>
                If you have any questions or need to make changes, feel free to reply to this email.
            </p>

            <p>We look forward to seeing you soon.</p>

            <p>
                <strong>Warm regards,</strong><br />
                The TouchedByNoa Team
            </p>
        </div>`

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

app.listen(port, () => console.log(`Running on port ${port}`));
