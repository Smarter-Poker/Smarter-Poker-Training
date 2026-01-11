export class PokerOrchestrator {
    constructor(bus) {
        this.bus = bus;
    }

    // MODE: GGPoker Style (Global Diamonds)
    enterDiamondArena(playerId, buyIn) {
        console.log(`🟢 [POKER_IQ] Entering Diamond Arena: ${playerId}`);
        this.bus.publish('ARENA_ENTRY', { playerId, diamonds: buyIn }, 'DIAMOND_ARENA');
    }

    // MODE: PokerBros Style (Private Chips)
    enterPrivateClub(playerId, clubId, chips) {
        console.log(`🟢 [CLUBS] Entering Club ${clubId}: ${playerId}`);
        this.bus.publish('CLUB_ENTRY', { playerId, clubId, chips }, 'CLUB_SYSTEM');
    }
}
