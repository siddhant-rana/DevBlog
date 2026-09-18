const nodemailer = require('nodemailer');

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
}[character]));

const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    const values = [name, email, subject, message].map((value) => String(value || '').trim());

    if (values.some((value) => !value)) {
        return res.status(400).json({ message: 'Name, email, subject, and message are required.' });
    }

    const [cleanName, cleanEmail, cleanSubject, cleanMessage] = values;
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_EMAIL) {
        return res.status(503).json({ message: 'Contact email is not configured on the server.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ''),
            },
        });

        await transporter.sendMail({
            from: `DevBlog Contact <${process.env.GMAIL_USER}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: cleanEmail,
            subject: `[DevBlog Contact] ${cleanSubject}`,
            text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
            html: `<h2>New DevBlog contact message</h2><p><strong>Name:</strong> ${escapeHtml(cleanName)}</p><p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p><p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p><p>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>`,
        });

        return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact email failed:', error.message);
        return res.status(500).json({ message: 'Unable to send the message right now.' });
    }
};

module.exports = { sendContactMessage };