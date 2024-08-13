const { exec } = require('child_process');
const { promisify } = require('util');
const schedule = require('node-schedule');
const axios = require('axios');
const execAsync = promisify(exec);

const DB_USER = 'root'; // Your MySQL username
const DB_PASSWORD = 'your_password'; // Your MySQL password
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/changeme'; // Your Discord webhook URL
const databases = ['panel', 'controlpanel']; // Add more databases here if needed

async function getCurrentDateTime() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    return { date, time };
}

async function backupDatabase(databaseName) {
    const { date, time } = await getCurrentDateTime();
    const backupFile = `/database/${databaseName}/${databaseName}-${date}-${time}.sql`;

    try {
        const { stdout, stderr } = await execAsync(`mysqldump -u ${DB_USER} -p${DB_PASSWORD} --opt ${databaseName} > ${backupFile}`);
        if (stderr) {
            throw new Error(stderr);
        }
        console.log(`${databaseName} backup completed: ${stdout}`);
        sendDiscordWebhook(`${databaseName} backup completed: ${backupFile}`);
    } catch (error) {
        console.error(`Error executing ${databaseName} backup: ${error.message}`);
        sendDiscordWebhook(`Error executing ${databaseName} backup: ${error.message}`);
    }
}

async function backupDatabases() {
    for (const db of databases) {
        await backupDatabase(db);
    }
}

function sendDiscordWebhook(message) {
    const embed = {
        embeds: [{
            description: message,
            color: 0x00ff00,
            timestamp: new Date().toISOString(),
        }]
    };

    axios.post(DISCORD_WEBHOOK_URL, embed)
        .then(response => {
            console.log('Discord webhook sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending Discord webhook:', error.message);
        });
}

// Schedule backup every 3 hours, change /3 to the amount you wnt
schedule.scheduleJob('0 */3 * * *', backupDatabases);

// Initial call to execute the backup immediately
backupDatabases();
