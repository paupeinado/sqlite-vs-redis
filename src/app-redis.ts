import Redis from "ioredis";
import express from 'express';

import { getRedisBestCampaignFactory } from "./campaign";
import { runRedisMigrationsFactory, redisMigrations } from "./migrations";

const app = express();
const port = process.env.SERVER_PORT;
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    enableReadyCheck: true,
});

const getBestCampaign = getRedisBestCampaignFactory(redisClient);
const runMigrations = runRedisMigrationsFactory(redisClient, redisMigrations);

runMigrations();

app.get('/:publisher/best-campaign', async (req, res) => {
    const campaign = await getBestCampaign(req.params.publisher);
    res.json(campaign);
});

app.listen(port, () => {
    console.log(`Redis app listening on port ${port}`)
});