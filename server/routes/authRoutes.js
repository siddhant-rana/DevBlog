const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const buildUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    picture: user.avatar || '',
});

const databaseUnavailable = (res) => {
    if (User.db.readyState === 1) return false;
    res.status(503).json({ message: 'Database is unavailable. Start MongoDB and try again.' });
    return true;
};

router.post('/register', async (req, res) => {
    if (databaseUnavailable(res)) return;
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        if (await User.findOne({ email: normalizedEmail })) {
            return res.status(409).json({ message: 'User already exists. Please log in instead.' });
        }
        const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
        return res.status(201).json({ message: 'User registered successfully. Please log in.', user: buildUser(user) });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to create account.' });
    }
});

router.post('/login', async (req, res) => {
    if (databaseUnavailable(res)) return;
    const { email, password } = req.body || {};
    if (!email?.trim() || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !user.password || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        return res.json({ message: 'Login successful', user: buildUser(user), token: generateToken(user) });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to log in.' });
    }
});

router.post('/google', async (req, res) => {
    if (databaseUnavailable(res)) return;
    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(503).json({ message: 'Google authentication is not configured on the server.' });
    }
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ message: 'Google credential is required.' });

    try {
        const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const email = payload.email?.toLowerCase();
        if (!payload.email_verified || !email) {
            return res.status(401).json({ message: 'Google email could not be verified.' });
        }

        let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email }] });
        if (!user) {
            user = await User.create({ name: payload.name || email.split('@')[0], email, googleId: payload.sub, avatar: payload.picture });
        } else if (!user.googleId) {
            user.googleId = payload.sub;
            user.avatar = payload.picture || user.avatar;
            await user.save();
        }
        return res.json({ message: 'Google sign-in successful', user: buildUser(user), token: generateToken(user) });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Google credential.' });
    }
});

module.exports = router;
