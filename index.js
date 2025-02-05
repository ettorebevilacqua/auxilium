const express = require('express');
const i18n = require('i18n');
const authRoutes = require('./src/routes/auth');
const indexRoutes = require('./src/routes/index');
const shopRoutes = require('./src/routes/shop');
const dashboardRoutes = require('./src/routes/dashboard');
const path = require('path');
const settingsRoutes = require('./src/routes/settings');
const aiConfigRoutes = require('./src/routes/aiConfig');
const aiResponseRoutes = require('./src/routes/aiResponse');
const shopifyIntegrationRoutes = require('./src/routes/shopifyIntegration');

const app = express();
const PORT = 3000;

i18n.configure({
  locales: ['en', 'it'],
  directory: __dirname + '/locales',
});
app.use(i18n.init);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com;");
    res.setHeader("X-Frame-Options", "ALLOW-FROM https://admin.shopify.com");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Middleware per i file statici
app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
app.use(settingsRoutes);
app.use(aiConfigRoutes);
app.use(shopifyIntegrationRoutes);
app.use('/', aiResponseRoutes);
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Shopify app listening on port ${PORT}`);
});
