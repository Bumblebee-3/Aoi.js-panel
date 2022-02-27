import { Bot } from "aoi.js";

declare module "aoi.js-panel"
export class Dash {
bot: Bot;
constructor(ops: Options)


start(): void
}
export interface Options {
bot: Bot;
}
export class Themes {
    static FLAGS: ThemeFlags
    static getPath(theme: Number): String
    static getName(theme: Number): String
    static isTheme(theme: Number): boolean
    
}
export interface ThemeFlags {
    0: String,
    1: String
}