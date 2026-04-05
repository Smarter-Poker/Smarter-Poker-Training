export const ACHIEVEMENTS = [
    { id: 'whale_hunter', name: 'Whale Hunter', criteria: (stats) => stats.singlePot >= 10000, diamonds: 50 },
    { id: 'grinder', name: 'The Grinder', criteria: (stats) => stats.handsPlayed >= 1000, diamonds: 25 },
    { id: 'poker_face', name: 'Poker Face', criteria: (stats) => stats.bluffsWon >= 10, diamonds: 15 }
];
