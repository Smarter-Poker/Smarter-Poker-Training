import { ArenaGatekeeper } from '../security/ArenaGatekeeper.js';

console.log("--- STARTING ARENA FIREWALL TEST ---");
const clubEvent = { arenaId: "CLUB_ARENA", potSize: 5000, type: "HAND_WON" };
const diamondEvent = { arenaId: "DIAMOND", potSize: 5000, type: "HAND_WON" };

console.time('FIREWALL_LATENCY');
const res1 = ArenaGatekeeper.isEventEligible(clubEvent);    // Should be false
const res2 = ArenaGatekeeper.isEventEligible(diamondEvent); // Should be true
console.timeEnd('FIREWALL_LATENCY');

console.log(`Club Arena Allowed: ${res1} | Diamond Arena Allowed: ${res2}`);
