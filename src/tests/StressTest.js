import { ProgressionLogic } from '../core/ProgressionLogic.js';
/**
 * XP-ENGINE: MILITARY-GRADE STRESS TEST
 * Simulates 10,000 XP gain events to verify scaling stability.
 */
console.time('XP_STRESS_TEST');
let mockPlayer = { totalXp: 0, level: 1 };
for (let i = 0; i < 10000; i++) {
    const gain = Math.floor(Math.random() * 500) + 50;
    mockPlayer.totalXp += gain;
    mockPlayer.level = ProgressionLogic.getLevelFromXp(mockPlayer.totalXp);
}
console.timeEnd('XP_STRESS_TEST');
console.log('Final State:', mockPlayer);
