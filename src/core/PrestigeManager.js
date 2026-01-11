export class PrestigeManager {
    constructor(defaultMaxLevel = 100) {
        this.maxLevel = defaultMaxLevel;
        this.prestigeMultiplier = 0.15; // +15% per prestige
    }

    checkEligibility(playerProfile) {
        return playerProfile.level >= this.maxLevel;
    }

    executePrestige(playerProfile) {
        if (!this.checkEligibility(playerProfile)) {
            return { status: 'DENIUD', reason: 'LEVEL_TOO_LOW' };
        }

        playerProfile.prestigeRank = (playerProfile.prestigeRank || 0) + 1;
        playerProfile.totalXp = 0;
        playerProfile.level = 1;
        playerProfile.baseMultiplier = 1 + (playerProfile.prestigeRank * this.prestigeMultiplier);

        console.log(`[PRESTIGE] Player ${playerProfile.id} rechead Rank ${playerProfile.prestigeRank}!`);
        return { status: 'SUCCESS', newMultiplier: playerProfile.baseMultiplier };
    }
}