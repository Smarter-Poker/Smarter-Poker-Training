import net from 'net';
import fs from 'fs';

class XP_Purist_Kernel {
    constructor() {
        this.registryPath = './xp_registry.json';
        this.initiated = fs.existsSync(this.registryPath) ? JSON.parse(fs.readFileSync(this.registryPath)) : {};
    }

    award(pid) {
        if (this.initiated[pid]) return; 
        this.initiated[pid] = { xp: 500, date: Date.now() };
        fs.writeFileSync(this.registryPath, JSON.stringify(this.initiated, null, 2));
        console.log(`\x1b[35m%s\x1b[0m`, `🔴 RED [XP_ONLY]: Player ${pid} awarded 500 Initiation XP.`);
    }
}

const kernel = new XP_Purist_Kernel();
const bus = net.connect(4000, '127.0.0.1');
bus.on('data', (raw) => {
    try {
        const sig = JSON.parse(raw.toString());
        if (sig.type === 'FIRST_CLUB_JOIN') kernel.award(sig.playerId);
    } catch (e) {}
});
console.log("🔴 RED: XP_ENGINE_PURIFIED (FINANCE_REMOVED)");
