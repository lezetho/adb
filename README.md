# ADB - AutoDBackup

>[!IMPORTANT]
>
>### This should be ran on your database machine
> ---
>This code should be setup and ran inside your database machine or where ever your database is located. External access is not coded inside the script yet, however it is planned to be updated.

This is a simple Node.JS application that's user friendly and allows users to backup their most important databases locally to a set position instead 2 folders: `controlpanel` and `pterodactyl`. This was originally created for ctrlpanel and pterodactyl use however can have multiple other uses

## Features

- **Scheduled Backups**: Automatic backups occur depending on the set interveal set in the code. This is planned to change when the next version releases.
- **Discord Updates**: The code sends a webhook to Discord with a embed stating that the database was backed up successfully so you don't need to worry.
- **Customizable**: The code is meant for ease, allowing users to change the time intervel, Discord webhook, and database location to their preferences. This is planned to change in the next update.

## Requirements

- Node.js installed
- MySQL database(s) setup.
- *optional* A Discord webhook URL for backup notifications.
- [PM2](https://pm2.keymetrics.io/) installed to easily be able to run the code (recommended).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lezetho/adb
   cd adb
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install PM2** (if not already installed) *Recommend option*:

   ```bash
   npm install pm2@latest -g
   ```

## Configuration

1. **Edit the backup commands**: Adjust the `panelBackup` and `controlPanelBackup` commands in `backupDatabases()` to match your database configuration and desired backup locations.

   ```javascript
   const panelBackup = `mysqldump -u root --opt panel > /database/panel/panel-${date}-${time}.sql`;
   const controlPanelBackup = `mysqldump -u root --opt controlpanel > /database/controlpanel/controlpanel-${date}-${time}.sql`;
   ```

2. **Set the Discord webhook URL**: Replace `'https://discord.com/api/webhooks/changeme'` with your actual Discord webhook URL. *optional*

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

On start of the code, it will backup immidiently. Please check your backup location to make sure that the backups are working. Please also check your Discord server to see if the Discord Webhook worked if enabled.

## License

This project is licensed under the MIT. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## Contact

For more information or to report issues, please visit our [GitHub repository](https://github.com/lezetho/adv).

## Credits

- [@Lezetho](https://github.com/lezetho) - Main maintainer
- [@SuperEvilLuke](https://github.com/SuperEvilLuke) - Contributer
