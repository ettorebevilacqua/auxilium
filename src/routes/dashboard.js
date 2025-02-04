const express = require('express');
const path = require('path');

const router = express.Router();
console.log('sono su route dashboard')
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/index.html'));
});

module.exports = router;
