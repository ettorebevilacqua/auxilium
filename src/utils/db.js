const fs = require('fs');
const path = require('path');

const settingsFile = path.join(__dirname, 'settings.json');

// Legge le impostazioni dal file JSON
const getSettings = async () => {
    if (!fs.existsSync(settingsFile)) return {};
    const data = fs.readFileSync(settingsFile);
    return JSON.parse(data);
};

// Salva le impostazioni nel file JSON
const saveSettings = async (settings) => {
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
};

module.exports = { getSettings, saveSettings };
