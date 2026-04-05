/**
 * DIAMOND-ENGINE: GLOBAL PROGRESSION CALCULATOR
 * ENFORCES: 1.5 EXPONENTIAL SCALING & MULTI-STREAK CALIBRATION
 */

const CONFIG = {
    BASE_DIAMONDS: 500,
    EXPONENT: 1.5,
    STREAK_INCREMENT: 0.15,
    STREAK_MAX: 2.0
};

export class ProgressionLogic {
    static getLevelFromDiamonds(totalDiamonds) {
        if (totalDiamonds < CONFIG.BASE_DIAMONDS) return 1;
        return Math.floor(Math.pow(totalDiamonds / CONFIG.BASE_DIAMONDS, 1 / CONFIG.EXPONENT)) + 1;
    }

    // Legacy alias
    static getLevelFromXp(totalXp) {
        return this.getLevelFromDiamonds(totalXp);
    }

    static getDiamondsRequiredForLevel(level) {
        if (level <= 1) return 0;
        return Math.floor(CONFIG.BASE_DIAMONDS * Math.pow(level - 1, CONFIG.EXPONENT));
    }

    static calculateNetGain(baseDiamonds, streakDays) {
        const multiplier = Math.min(1 + (streakDays * CONFIG.STREAK_INCREMENT), CONFIG.STREAK_MAX);
        return {
            raw: baseDiamonds,
            multiplier: multiplier.toFixed(2),
            net: Math.floor(baseDiamonds * multiplier)
        };
    }

    static getProgressToNextLevel(totalDiamonds) {
        const currentLevel = this.getLevelFromDiamonds(totalDiamonds);
        const diamondsCurrentLevel = this.getDiamondsRequiredForLevel(currentLevel);
        const diamondsNextLevel = this.getDiamondsRequiredForLevel(currentLevel + 1);

        const progress = (totalDiamonds - diamondsCurrentLevel) / (diamondsNextLevel - diamondsCurrentLevel);
        return {
            currentLevel,
            nextLevel: currentLevel + 1,
            percent: (progress * 100).toFixed(2),
            remaining: diamondsNextLevel - totalDiamonds
        };
    }
}
