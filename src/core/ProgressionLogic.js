/**
 * XP-ENGINE: GLOBAL PROGRESSION CALCULATOR
 * ENFORCES: 1.5 EXPONENTIAL SCALING & MULTI-STREAK CALIBRATION
 */

const CONFIG = {
    BASE_XP: 1000,
    EXPONENT: 1.5,
    STREAK_INCREMENT: 0.15,
    STREAK_MAX: 2.0
};

export class ProgressionLogic {
    static getLevelFromXp(totalXp) {
        if (totalXp < CONFIG.BASE_XP) return 1;
        return Math.floor(Math.pow(totalXp / CONFIG.BASE_XP, 1 / CONFIG.EXPONENT)) + 1;
    }

    static getXpRequiredForLevel(level) {
        if (level <= 1) return 0;
        return Math.floor(CONFIG.BASE_XP * Math.pow(level - 1, CONFIG.EXPONENT));
    }

    static calculateNetGain(baseXp, streakDays) {
        const multiplier = Math.min(1 + (streakDays * CONFIG.STREAK_INCREMENT), CONFIG.STREAK_MAX);
        return {
            raw: baseXp,
            multiplier: multiplier.toFixed(2),
            net: Math.floor(baseXp * multiplier)
        };
    }

    static getProgressToNextLevel(totalXp) {
        const currentLevel = this.getLevelFromXp(totalXp);
        const xpCurrentLevel = this.getXpRequiredForLevel(currentLevel);
        const xpNextLevel = this.getXpRequiredForLevel(currentLevel + 1);
        
        const progress = (totalXp - xpCurrentLevel) / (xpNextLevel - xpCurrentLevel);
        return {
            currentLevel,
            nextLevel: currentLevel + 1,
            percent: (progress * 100).toFixed(2),
            remaining: xpNextLevel - totalXp
        };
    }
}
