import { ProgressionLogic } from '../core/ProgressionLogic.js';
/**
 * DIAMOND-ENGINE: STRESS TEST
 * Simulates 10,000 diamond gain events to verify scaling stability.
 */
console.time('DIAMOND_STRESS_TEST');
let mockPlayer = { totalDiamonds: 0, level: 1 };
for (let i = 0; i < 10000; i++) {
    const gain = Math.floor(Math.random() * 500) + 50;
    mockPlayer.totalDiamonds += gain;
    mockPlayer.level = ProgressionLogic.getLevelFromDiamonds(mockPlayer.totalDiamonds);
}
console.timeEnd('DIAMOND_STRESS_TEST');
console.log('Final State:', mockPlayer);
