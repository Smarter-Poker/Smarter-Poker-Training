/**
 * DIAMOND-ENGINE - ARENA GATEKEEPER (FIREWALL)
 * Ensures Diamond rewards are EXCLUSIVE to the Diamond Arena.
 * Blocks all external Club Arena monetary/diamond triggers.
 */
export class ArenaGatekeeper {
    static VALID_ARENA = "DIAMOND";

    static isEventEligible(event) {
        const isDiamond = event.arenaId === this.VALID_ARENA;

        if (!isDiamond) {
            console.warn(`[FIREWALL] Blocked Diamond Trigger: Event originated from CLUB_ARENA (External Settlement).`);
            return false;
        }

        console.log(`[FIREWALL] Diamond Trigger Authorized: DIAMOND_ARENA event verified.`);
        return true;
    }

    static processFilteredEvent(event, playerProfile, diamondBridge) {
        if (this.isEventEligible(event)) {
            return diamondBridge.calculateDiamondGain(event, playerProfile);
        }
        return { status: "BLOCKED", reason: "NON_DIAMOND_ARENA" };
    }
}
