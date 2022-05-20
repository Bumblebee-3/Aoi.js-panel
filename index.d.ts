import { Bot } from "aoi.js";

declare module "aoi.js-panel";
export interface DashInterface {
start(): void;
ops: DashOptions;
bot: Bot;
port: number;
username: string;
ownersIds: string[];
information: {
    body: {
    title: string;
    description: string;
    }[];
    
};
    store: any;
    cmd: string;
    api: Api;
    theme: ThemeFlags;
discord: DiscordInterface;
}

export class Dash implements DashInterface {
// bot: Bot;
// ops: DashOptions;
// ownersIds: string[];

constructor(ops: DashOptions)


start(): void
}
export interface DashOptions {
bot: Bot;
port: number;
username: string;
pass: string;
command: string;
discord: {
clientId: string;
clientSecret: string;
redirectUri: string;
};
express: {
session: any;
store: any;
};
theme: number;
information: {
homepage: {
body: {
title: string;
description: string;
}[];
};
};
owners: string[];
}
export class Themes {
    static FLAGS: ThemeFlags
    static getPath(theme: Number): String
    static getName(theme: Number): String
    static isTheme(theme: Number): boolean
    
}
export enum ThemeFlags {
}