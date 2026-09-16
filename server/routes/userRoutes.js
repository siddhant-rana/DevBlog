const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({ user: { name: 'Demo User', email: 'demo@example.com' } });
});

module.exports = router;
