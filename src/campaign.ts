import type { Database } from "better-sqlite3";
import type { Redis } from "ioredis";

export interface Campaign {
    id: string;
    publisher: string;
    data: string;
}

export interface CampaignInfo {
    creative: string;
    bid: number;
}

export type GetBestCampaign = (publisher: string) => Promise<Campaign>;

export function getSqliteBestCampaignFactory(dbConn: Database): GetBestCampaign {
    return async function (publisher: string): Promise<Campaign> {
        const stmt = dbConn.prepare(
            `SELECT * FROM campaigns WHERE publisher = ?`
        );

        const campaigns =  stmt.all(publisher) as Campaign[];

        const bestCampaign = campaigns.reduce((acc, campaign) => {
            const accCampaignInfo = JSON.parse(acc.data) as CampaignInfo;
            const campaignInfo = JSON.parse(campaign.data) as CampaignInfo;
            return campaignInfo.bid > accCampaignInfo.bid ? campaign : acc;
        }, {data: '{"bid": 0}'} as Campaign);

        return new Promise<Campaign>((resolve) => resolve(bestCampaign));
    }
}

export function getRedisBestCampaignFactory(redisClient: Redis): GetBestCampaign {
    return async function (publisher: string): Promise<Campaign> {
        const rows =  await redisClient.hgetall(`{${publisher}}:campaigns`);

        return Object.entries(rows).reduce((acc, [_, row]) => {
            const campaign = JSON.parse(row) as Campaign;
            const accCampaignInfo = JSON.parse(acc.data) as CampaignInfo;
            const campaignInfo = JSON.parse(campaign.data) as CampaignInfo;
            return campaignInfo.bid > accCampaignInfo.bid ? campaign : acc;
        }, {data: '{"bid": 0}'} as Campaign);
    }
}