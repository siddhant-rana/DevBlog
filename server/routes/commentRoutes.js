const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ comments: [] });
});

router.post('/', (req, res) => {
    const { comment } = req.body || {};
    if (!comment) {
        return res.status(400).json({ message: 'Comment is required.' });
    }

    return res.status(201).json({
        message: 'Comment added',
        comment: { text: comment },
    });
});

module.exports = router;
