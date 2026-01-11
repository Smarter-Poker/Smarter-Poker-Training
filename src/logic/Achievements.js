export const ACHIEVEMENTS = [
    { id: 'whale_hunter', name: 'Whale Hunter', criteria: (stats) => stats.singlePot >= 10000, xp: 5000 },
    { id: 'grinder', name: 'The Grinder', criteria: (stats) => stats.handsPlayed >= 1000, xp: 2500 },
    { id: 'poker_face', name: 'Poker Face', criteria: (stats) => stats.bluffsWon >= 10, xp: 1500 }
];
