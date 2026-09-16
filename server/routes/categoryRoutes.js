const express = require('express');
const { categories } = require('../seed/mockData');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ categories });
});

module.exports = router;
