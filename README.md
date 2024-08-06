# Auto Database Backup

This project is a Node.js application that schedules regular backups of MySQL databases and sends notifications to a Discord channel via webhook upon completion. It utilizes the `node-schedule` library for scheduling and `axios` for sending HTTP requests.

**IMPORTANT:** This script should be run on the actual machine where the databases are located. It is not designed to be executed in a Pterodactyl environment.

## Features

- **Scheduled Backups**: Automatically backs up databases at a specified interval.
- **Discord Notifications**: Sends a message to a Discord channel when a backup is completed.
- **Customizable**: Easily adjust the database backup commands, file paths, and Discord webhook URL.

## Prerequisites

- Node.js installed on your system.
- Access to MySQL databases.
- A Discord webhook URL for notifications.
- [PM2](https://pm2.keymetrics.io/) installed for process management (recommended).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Embotic-xyz/Auto-Database-Backup
   cd Auto-Database-Backup
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install PM2** (if not already installed):

   ```bash
   npm install pm2@latest -g
   ```

## Configuration

1. **Edit the backup commands**: Adjust the `panelBackup` and `controlPanelBackup` commands in `backupDatabases()` to match your database configuration and desired backup locations.

   ```javascript
   const panelBackup = `mysqldump -u root --opt panel > /database/panel/panel-${date}-${time}.sql`;
   const controlPanelBackup = `mysqldump -u root --opt controlpanel > /database/controlpanel/controlpanel-${date}-${time}.sql`;
   ```

2. **Set the Discord webhook URL**: Replace `'https://discord.com/api/webhooks/changeme'` with your actual Discord webhook URL.

   ```javascript
   const webhookUrl = 'https://discord.com/api/webhooks/changeme';
   ```

3. **Schedule Adjustments**: The current schedule runs backups every 3 hours. Modify the cron expression in `schedule.scheduleJob()` to fit your needs.

   ```javascript
   schedule.scheduleJob('0 */3 * * *', backupDatabases);
   ```

## Usage

To start the application using PM2, run:

```bash
pm2 start index.js --name "auto-database-backup"
```

This will trigger an immediate backup and then schedule further backups according to the specified interval. PM2 will ensure the script continues running and restarts it if necessary.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## Contact

For more information or to report issues, please visit our [GitHub repository](https://github.com/Embotic-xyz/Auto-Database-Backup).

## Credits

- [@Lezetho](https://github.com/lezetho) - Main maintainer
- [@SuperEvilLuke](https://github.com/SuperEvilLuke) - Code improvements
