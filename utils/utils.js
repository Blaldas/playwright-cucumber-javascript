import dotenv from 'dotenv';
import path from 'path';

// load .env once (safe if called multiple times)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Get environment variable with parsing, default and required checks.
 * @param {string} name - env var name
 * @param {{ required?: boolean, defaultValue?: any, parser?: 'string'|'bool'|'int'|'json'|((v:string)=>any) }} [opts]
 */
export function getEnv(name, opts = {}) {
    const { required = false, defaultValue = undefined, parser = 'string' } = opts;
    const raw = process.env[name];

    if (raw == null || raw === '') {
        if (required && defaultValue === undefined) {
            throw new Error(`Missing required environment variable: ${name}`);
        }
        return defaultValue;
    }

    if (typeof parser === 'function') return parser(raw);

    switch (parser) {
        case 'bool':
            return !(raw.toLowerCase() === 'false' || raw === '0' || raw.toLowerCase() === 'no' || raw === 'n');
        case 'int': {
            const n = parseInt(raw, 10);
            if (Number.isNaN(n)) throw new Error(`Environment variable ${name} is not a valid int: "${raw}"`);
            return n;
        }
        case 'json':
            try { return JSON.parse(raw); } catch (e) { throw new Error(`Environment variable ${name} is not valid JSON: ${e.message}`); }
        case 'string':
        default:
            return raw;
    }
}