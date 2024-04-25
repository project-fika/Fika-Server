/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
export type HandleFn = (_: string, req: IncomingMessage, resp: ServerResponse) => void;
/**
 *  Associates handlers, HTTP methods and a base url to a listener using a proxy
 *  @param basePath The base path
 *  @returns The decorator that create the listener proxy
 */
export declare const Listen: (basePath: string) => <T extends new (...args: any[]) => any>(Base: T) => T;
/**
 *  HTTP DELETE decorator
 */
export declare const Delete: (path?: string) => (target: any, propertyKey: string) => void;
/**
 *  HTTP GET decorator
 */
export declare const Get: (path?: string) => (target: any, propertyKey: string) => void;
/**
 *  HTTP OPTIONS decorator
 */
export declare const Options: (path?: string) => (target: any, propertyKey: string) => void;
/**
 *  HTTP PATCH decorator
 */
export declare const Patch: (path?: string) => (target: any, propertyKey: string) => void;
/**
 *  HTTP POST decorator
 */
export declare const Post: (path?: string) => (target: any, propertyKey: string) => void;
/**
 *  HTTP PUT decorator
 */
export declare const Put: (path?: string) => (target: any, propertyKey: string) => void;
