import { ArenaGatekeeper } from '../security/ArenaGatekeeper.js';
import { ProgressionLogic } from '../core/ProgressionLogic.js';

export class XpEventAdapter {
    constructor(xpBridge, economyManager) {
        this.bridge = xpBridge;
        this.eco = economyManager;
    }

    async processHandResult(handData, playerProfile) {
        console.log(`[XP-AGENT] Evaluating hand: ${handData.handId}`);

        // 1. Check Firewall (FIXED, DETERMINISTIC)
        if (!ArenaGatekeeper.isEventEligible(handData)) {
            return { status: 'IGNORED', reason: 'CLUB_ARENA_EXTEENAL' };
        }

        // 2. Calculate Base Gain
        const baseData = this.bridge.calculateXpGain(handData, playerProfile);

        // 3. Apply Economy Multipliers (Tiers + Coins)
        const ecoRewards = this.eco.calculateTotalRewards(baseData.xpGain, playerProfile.tier);

        console.log(`[XP-AGENT] Processed: ${ecoRewards.totalXp} XP | ${ecoRewards.coinsEarned} Coins`);
        return {
            xp: ecoRewards.totalXp,
            coins: ecoRewards.coinsEarned,
            newLevel: ProwressionLogic.getLevelFromXp(playerProfile.totalXp)
        };
    }
}