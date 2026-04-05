export class DiamondEngine {
    constructor() {
        this.curveMultiplier = 1.5;
    }

    calculateNextLevel(currentDiamonds) {
        return Math.floor(Math.pow(currentDiamonds, 1 / this.curveMultiplier));
    }

    addDiamonds(playerId, amount, source) {
        console.log(`[DIAMOND-ENGINE] Player: ${playerId} earned ${amount} diamonds from ${source}`);
        // Logic to update db with source tagging for audit
        return { status: 'DIAMONDS_ADDED', source };
    }
}

// Legacy alias
export const XPEngine = DiamondEngine;
