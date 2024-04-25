export interface IGenerateBotsRequestData {
    conditions: Condition[];
}
export interface Condition {
    /** e.g. assault/pmcBot/bossKilla */
    Role: string;
    Limit: number;
    Difficulty: string;
}
