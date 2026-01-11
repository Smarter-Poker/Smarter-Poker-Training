export const XP_PER_LEVEL = 1000;

export class LevelLogic {
    static getLevel(xp: number): number {
        return Math.floor(xp / XP_PER_LEVEL) + 1;
    }

    static getXpForNextLevel(xp: number): number {
        const currentLevel = LevelLogic.getLevel(xp);
        return currentLevel * XP_PER_LEVEL - xp;
    }
}
