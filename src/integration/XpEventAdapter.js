import { ArenaGatekeeper } from '../security/ArenaGatekeeper.js';
import { ProgressionLogic } from '../core/ProgressionLogic.js';

export class XpEventAdapter {
    constructor(diamondBridge, economyManager) {
        this.bridge = diamondBridge;
        this.eco = economyManager;
    }

    async processHandResult(handData, playerProfile) {
        console.log(`[DIAMOND-AGENT] Evaluating hand: ${handData.handId}`);

        // 1. Check Firewall (FIXED, DETERMINISTIC)
        if (!ArenaGatekeeper.isEventEligible(handData)) {
            return { status: 'IGNORED', reason: 'CLUB_ARENA_EXTERNAL' };
        }

        // 2. Calculate Base Gain
        const baseData = this.bridge.calculateDiamondGain(handData, playerProfile);

        // 3. Apply Economy Multipliers (Tiers + Coins)
        const ecoRewards = this.eco.calculateTotalRewards(baseData.diamondGain, playerProfile.tier);

        console.log(`[DIAMOND-AGENT] Processed: ${ecoRewards.totalDiamonds || ecoRewards.totalXp} diamonds | ${ecoRewards.coinsEarned} Coins`);
        return {
            diamonds: ecoRewards.totalDiamonds || ecoRewards.totalXp,
            coins: ecoRewards.coinsEarned,
            newLevel: ProgressionLogic.getLevelFromDiamonds(playerProfile.totalDiamonds || playerProfile.totalXp)
        };
    }
}
