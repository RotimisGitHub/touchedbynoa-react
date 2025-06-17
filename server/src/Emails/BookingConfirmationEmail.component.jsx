import React from 'react';
// import './emails.styles.scss'

const BookingConfirmationEmail = ({bookingInformation}) => {


    return (
        <div>
            <h2>Your Appointment is Confirmed</h2>

            <p>Dear {bookingInformation.name},</p>

            <p>
                Thank you for booking with <strong>TouchedByNoa</strong>. We're pleased to confirm your hair appointment.
                Below are the details of your scheduled session:
            </p>

            <table>
                <tbody>
                <tr>
                    <td><strong>Hairstyle:</strong></td>
                    <td>{bookingInformation.hairstyleTitle}</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>{bookingInformation.start}</td>
                </tr>
                <tr>
                    <td><strong>Time:</strong></td>
                    <td>{bookingInformation.start} - {bookingInformation.end}</td>
                </tr>
                <tr>
                    <td><strong>Duration:</strong></td>
                    <td>{bookingInformation.duration} hour(s)</td>
                </tr>
                <tr>
                    <td><strong>Length:</strong></td>
                    <td>{bookingInformation.length}</td>
                </tr>
                <tr>
                    <td><strong>Thickness:</strong></td>
                    <td>{bookingInformation.thickness}</td>
                </tr>
                </tbody>
            </table>

            {bookingInformation.hairstyleImage && (
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
        </div>
    );
}

export default BookingConfirmationEmail;