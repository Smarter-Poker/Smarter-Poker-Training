/**
 * DIAMOND-ENGINE - INTEGRATION BRIDGE
 * Logic: Calculates diamond rewards, applies streaks, and checks milestones in real-time.
 */

const DIAMOND_CONFIG = {
    BASE_WIN_MULTIPLIER: 0.1, // 10% of pot as diamonds
    HAND_PLAYED_DIAMONDS: 5,
    STREAK_CAP: 2.0,
    LEVEL_EXPONENT: 1.5
};

export class XpBridge {
    static calculateDiamondGain(event, playerProfile) {
        let rawDiamonds = 0;
        const streakMultiplier = Math.min(1 + (playerProfile.streakDays * 0.15), DIAMOND_CONFIG.STREAK_CAP);

        switch(event.type) {
            case 'HAND_WON':
                rawDiamonds = (event.potSize * DIAMOND_CONFIG.BASE_WIN_MULTIPLIER);
                break;
            case 'SHOWDOWN_REACHED':
                rawDiamonds = DIAMOND_CONFIG.HAND_PLAYED_DIAMONDS * 2;
                break;
            default:
                rawDiamonds = DIAMOND_CONFIG.HAND_PLAYED_DIAMONDS;
        }

        const totalEarned = Math.floor(rawDiamonds * streakMultiplier);
        return this.applyProgress(playerProfile, totalEarned);
    }

    // Legacy alias
    static calculateXpGain(event, playerProfile) {
        return this.calculateDiamondGain(event, playerProfile);
    }

    static applyProgress(profile, diamondGain) {
        profile.totalDiamonds = (profile.totalDiamonds || profile.totalXp || 0) + diamondGain;
        const newLevel = Math.floor(Math.pow(profile.totalDiamonds / 500, 1 / DIAMOND_CONFIG.LEVEL_EXPONENT)) + 1;

        const leveledUp = newLevel > profile.level;
        profile.level = newLevel;

        return {
            diamondGain,
            currentLevel: profile.level,
            leveledUp,
            totalDiamonds: profile.totalDiamonds
        };
    }
}
