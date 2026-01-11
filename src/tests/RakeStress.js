import { RakeBackEngine } from '../economy/RakeBackEngine.js';

const engine = new RakeBackEngine();
const mockHands = Array.from({ length: 5000 }, () => ({ pot: Math.random() * 5000 }));

console.log("--- STARTING RAKE-BACK DENSITY TEST ---");
const results = engine.processBatch(mockHands, 'PLATINUM');
console.log(`Successfully processed ${results.length} hand rebates.`);
