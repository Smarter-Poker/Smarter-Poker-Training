import { DiamondVault } from '../vault/DiamondVault.js';

export class CashOutAuditor {
    constructor(bus) {
        this.bus = bus;
        this.vault = new DiamondVault();
        this.init();
    }

    init() {
        this.bus.subscribe('AUDIT_REQUEST', (data) => {
            const isSafe = data.rakeAmount < 5000;
            if (isSafe) {
                console.log(`🔴 RED [AUDITOR]: Transaction verified. Securing ${data.rakeAmount} in Vault.`);
                this.vault.secure(data.rakeAmount);
            } else {
                console.log(`⚠️  🔴 RED [AUDITOR]: TRANSACTION BLOCKED. PENDING REVIEW.`);
            }
        });
    }
}
