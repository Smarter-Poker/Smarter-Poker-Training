export const DIAMONDS_PER_LEVEL = 500;

export class LevelLogic {
    static getLevel(diamonds: number): number {
        return Math.floor(diamonds / DIAMONDS_PER_LEVEL) + 1;
    }

    static getDiamondsForNextLevel(diamonds: number): number {
        const currentLevel = LevelLogic.getLevel(diamonds);
        return currentLevel * DIAMONDS_PER_LEVEL - diamonds;
    }
}

// Legacy aliases
export const XP_PER_LEVEL = DIAMONDS_PER_LEVEL;
