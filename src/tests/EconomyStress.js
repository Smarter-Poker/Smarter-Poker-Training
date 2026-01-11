import { EconomyManager } from '../economy/EconomyManager.js';
/**
 * EG: XP-ENGINE - ECONOMY STRESS TEST
 * Simulates 50,000 reward conversions across different tiers.
 */
const manager = new EconomyManager({ conversionRate: 0.05 });
const tiers = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

console.time('ECONOMY_DENSITY_TEST');
for(let i=0; i<50000; i++) {
    const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
    manager.calculateTotalRewards(Math.random() * 1000, randomTier);
}
console.timeEnd('ECONOMY_DENSITY_TEST');
