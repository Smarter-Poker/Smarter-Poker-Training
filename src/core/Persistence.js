import fs from 'fs';
/**
 * XP-ENGINE: PERSISTENCE LAYER
 * Handles Atomic I/O for Player Progress and Global Rankings.
 */
export class Persistence {
    static async save(filename, data) {
        const path = `./src/data/${filename}.json`;
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
                if (err) reject(err);
                else resolve({ status: 'SUCCESS', path });
            });
        });
    }

    static load(filename) {
        const path = `./src/data/${filename}.json`;
        if (!fs.existsSync(path)) return null;
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
}
