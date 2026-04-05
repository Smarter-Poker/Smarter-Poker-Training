export class ArenaInterface {
    constructor(bus) {
        this.bus = bus;
        this.init();
    }
    init() {
        this.bus.subscribe('DIAMOND_TRANSFER', (data) => {
            console.log('\x1b[41m%s\x1b[0m', '💎 [ARENA_SHELL]');
            console.log(`Updating UI for ${data.to}...`);
            // Law: Every Diamond won triggers diamond reward
            this.bus.publish('DIAMONDS_AWARDED', { globalId: data.to, amount: data.amount }, 'ARENA_SHELL');
        });
    }
}
