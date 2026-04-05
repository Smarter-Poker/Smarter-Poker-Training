export class ProgressionEngine {
    addDiamonds(player, amount) {
        const gain = Math.max(0, amount);
        console.log(`💎 [DIAMONDS]: Awarding ${gain} diamonds to ${player}`);
        return gain;
    }

    // Legacy alias
    addXP(player, amount) {
        return this.addDiamonds(player, amount);
    }
}
