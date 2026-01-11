export class XPEngine {
    constructor() {
        this.curveMultiplier = 1.5;
    }

    calculateNextLevel(currentXp) {
        return Math.floor(Math.pow(currentXp, 1 / this.curveMultiplier));
    }

    addXp(playerId, amount, source) {
        console.log(`[XP-ENGINE] Player: ${playerId} earned ${amount} XP from ${source}`);
        // Logic to update db with source tagging for audit
        return { status: 'XPL_ADDED', source };
    }
}