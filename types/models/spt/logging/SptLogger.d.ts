export interface SptLogger {
    error: (msg: string | Record<string, unknown>) => void;
    warn: (msg: string | Record<string, unknown>) => void;
    succ?: (msg: string | Record<string, unknown>) => void;
    info: (msg: string | Record<string, unknown>) => void;
    debug: (msg: string | Record<string, unknown>) => void;
}
