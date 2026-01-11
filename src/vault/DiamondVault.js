export class DiamondVault {
    constructor() { this.reserves = 1000000; }
    secure(amount) { this.reserves += amount; console.log(`🔴 RED [VAULT]: Reserves at ${this.reserves}`); }
}
