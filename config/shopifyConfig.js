module.exports = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI || 'https://yourdomain.com/auth/callback',
  SCOPES: ['read_products', 'write_products'],
};