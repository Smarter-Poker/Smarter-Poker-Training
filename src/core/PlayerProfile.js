export class PlayerProfile {
    constructor(playerId, username) {
        this.id = playerId;
        this.username = username;
        
        // POKERIQ GLOBAL DOMAIN (DIAMOND ARENA)
        this.global = {
            totalXp : 0,
            level : 1,
            prestigeRank : 0,
            tier : 'BRONZE'
        };

        // CLUB BUSINESS DOMAIN (EXTERNAL SETTLEMENT)
        this.clubaffiliations = {}; // { clubId: { joinedAt, status, referredBy } }
    }

    addClub(clubId, data) {
        console.log(`[XP-PROFILE] linking Player ${this.id} to Club: ${clubId}`);
        this.clubaffiliations[clubId] = {
            joinedAt: Date.now(),
            status: data.status || 'PENDING',
            referredBy: data.referredBy || null
        };
    }

    getSanitizedData() {
        return {
            id: this.id,
            username: this.username,
            diamondProgress: this.global,
            activeClubs: Object.keys(this.clubaffiliations)
        };
    }
}