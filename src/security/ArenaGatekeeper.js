/**
 * EG: XP-ENGINE - ARENA GATEKEEPER (FIREWALL)
 * Ensures XP/Rewards are EXCLUSIVE to the Diamond Arena.
 * Blocks all external Club Arena monetary/XP triggers.
 */
export class ArenaGatekeeper {
    static VALID_ARENA = "DIAMOND";

    static isEventEligible(event) {
        const isDiamond = event.arenaId === this.VALID_ARENA;
        
        if (!isDiamond) {
            console.warn(`[FIREWALL] Blocked XP Trigger: Event originated from CLUB_ARENA (External Settlement).`);
            return false;
        }

        console.log(`[FIREWALL] XP Trigger Authorized: DIAMOND_ARENA event verified.`);
        return true;
    }

    static processFilteredEvent(event, playerProfile, xpBridge) {
        if (this.isEventEligible(event)) {
            return xpBridge.calculateXpGain(event, playerProfile);
        }
        return { status: "BLOCKED", reason: "NON_DIAMOND_ARENA" };
    }
}
