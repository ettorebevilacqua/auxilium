const express = require('express');
const path = require('path');

const router = express.Router();
console.log('sono su route dashboard')
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/index.html'));
});

router.get('/setup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/dashboard.html'));
});

router.get('/collections', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/collections.html'));
});

module.exports = router;
