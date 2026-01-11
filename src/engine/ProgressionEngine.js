export class ProgressionEngine {
    addXP(player, amount) {
        const gain = Math.max(0, amount);
        console.log(`🔴 RED [XP]: Awarding ${gain} XP to ${player}`);
        return gain;
    }
}
