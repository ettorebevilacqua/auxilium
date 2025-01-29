const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
   // res.send('Hello from Auxilium-app');
// });
router.get('/', (req, res) => {
    if (req.query.shop) {
        console.log('🌍 Redirecting to /auth:', req.query.shop);
        res.redirect(`/auth?shop=${req.query.shop}`);
    } else {
        res.send('Hello from Auxilium-app - Root route ');
    }
});

module.exports = router;
