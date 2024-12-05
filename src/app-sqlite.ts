import Database from 'better-sqlite3';
import express from 'express';
import fs from 'fs';

import { runSqliteMigrationsFactory, sqliteMigrations } from './migrations';
import { getSqliteBestCampaignFactory } from './campaign';

const port = process.env.SERVER_PORT;
const dbPath = process.env.DB_PATH ?? '';

// Delete database file to start fresh
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const dbConn = Database(dbPath);
const getBestCampaign = getSqliteBestCampaignFactory(dbConn);
const runMigrations = runSqliteMigrationsFactory(dbConn, sqliteMigrations);

const app = express();
app.get('/:publisher/best-campaign', async (req, res) => {
    const campaign = await getBestCampaign(req.params.publisher);
    res.json(campaign);
});

app.listen(port, () => {
    runMigrations();
    console.log(`SQLite app listening on port ${port}`)
});