/**
 * XP-ENGINE - MILITARY GRADE INTEGRATION BRIDGE
 * Logic: Calculates XP, applies streaks, and checks milestones in real-time.
 */

const XP_CONFIG = {
    BASE_WIN_MULTIPLIER: 0.1, // 10% of pot as XP
    HAND_PLAYED_XP: 25,
    STREAK_CAP: 2.0,
    LEVEL_EXPONENT: 1.5
};

export class XpBridge {
    static calculateXpGain(event, playerProfile) {
        let rawXp = 0;
        const streakMultiplier = Math.min(1 + (playerProfile.streakDays * 0.15), XP_CONFIG.STREAK_CAP);

        switch(event.type) {
            case 'HAND_WON':
                rawXp = (event.potSize * XP_CONFIG.BASE_WIN_MULTIPLIER);
                break;
            case 'SHOWDOWN_REACHED':
                rawXp = XP_CONFIG.HAND_PLAYED_XP * 2;
                break;
            default:
                rawXp = XP_CONFIG.HAND_PLAYED_XP;
        }

        const totalEarned = Math.floor(rawXp * streakMultiplier);
        return this.applyProgress(playerProfile, totalEarned);
    }

    static applyProgress(profile, xpGain) {
        profile.totalXp += xpGain;
        const newLevel = Math.floor(Math.pow(profile.totalXp / 1000, 1 / XP_CONFIG.LEVEL_EXPONENT)) + 1;
        
        const leveledUp = newLevel > profile.level;
        profile.level = newLevel;

        return {
            xpGain,
            currentLevel: profile.level,
            leveledUp,
            totalXp: profile.totalXp
        };
    }
}
