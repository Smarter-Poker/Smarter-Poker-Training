export class ArenaRakeLogic {
    calculateArenaSplit(rakeAmount) {
        // DIAMOND ARENA LAW: No Promo Fund.
        // 60% to Main BBJ, 40% to Backup BBJ (or your preferred ratio)
        return {
            mainBBJ: rakeAmount * 0.60,
            backupBBJ: rakeAmount * 0.40,
            promoFund: 0 // HARD LOCKED
        };
    }
}
