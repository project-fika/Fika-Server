export class FikaClientModHashesHelper {
    protected hashes: Map<string, number>;

    constructor() {
        this.hashes = new Map();
    }

    public getLength(): number {
        return this.hashes.size;
    }

    public exists(pluginId: string): boolean {
        return this.hashes.has(pluginId);
    }

    public getHash(pluginId: string): number {
        return this.hashes.get(pluginId);
    }

    public addHash(pluginId: string, hash: number): void {
        this.hashes.set(pluginId, hash);
    }
}
