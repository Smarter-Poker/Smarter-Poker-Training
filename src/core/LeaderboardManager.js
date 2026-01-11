/**
 * XP-ENGINE: LEADERBOARD & RANKING SYSTEM
 * High-density sorting for Global and Club-specific standings.
 */

export class LeaderboardManager {
    constructor() {
        this.globalStandings = []; // Array of {playerId, username, level, totalXp}
    }

    updatePlayer(playerData) {
        const index = this.globalStandings.findIndex(p => p.playerId === playerData.playerId);
        if (index !== -1) {
            this.globalStandings[index] = { ...this.globalStandings[index], ...playerData };
        } else {
            this.globalStandings.push(playerData);
        }
        this.sortStandings();
    }

    sortStandings() {
        // Sort by XP Descending
        this.globalStandings.sort((a, b) => b.totalXp - a.totalXp);
    }

    getTopRankings(limit = 100) {
        return this.globalStandings.slice(0, limit).map((player, index) => ({
            rank: index + 1,
            ...player
        }));
    }

    getPlayerRank(playerId) {
        const rank = this.globalStandings.findIndex(p => p.playerId === playerId);
        return rank !== -1 ? rank + 1 : null;
    }
}
