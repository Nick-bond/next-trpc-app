import nodemailer from 'nodemailer';

export const sendEmail = async () => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_FROM,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to:  process.env.SMTP_TO,
        subject: 'All your tasks are completed!',
        text: 'Congratulations! You have completed all your tasks.',
        html: `
            <h2>Congratulations!</h2>
            <p>You have completed all your tasks in the To-Do List app!</p>
            <p>Great job on staying productive!</p>
        `,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, (err) => {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
    } catch (error) {
        throw new Error(`Cannot send email: ${error}`)
    }
};
