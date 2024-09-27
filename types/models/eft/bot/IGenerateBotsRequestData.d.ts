export interface IGenerateBotsRequestData {
    conditions: ICondition[];
}
export interface ICondition {
    /** e.g. assault/pmcBot/bossKilla */
    Role: string;
    Limit: number;
    Difficulty: string;
}
