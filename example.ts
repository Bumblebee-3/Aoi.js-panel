import { Client } from "discord.js"

const dash =require("./src/index.js");
const aoi = require("aoi.js")
var SQLiteStore = require('connect-sqlite3')(dash.Dash.Session);
const config = require('./config.json')
const bot = new aoi.Bot({
token: config.token, // Grab Token From CLI
prefix: "!",
intents: ["GUILDS", "GUILD_MESSAGES"],
// database: { tables: ["ma }
})
bot.on('ready', (c: Client) => {
    const dt = new dash.Dash({
        bot:bot,
        port:3000,
        username:"neon",
        password: config.pass,
        command:"./commands/",
        discord: {
            clientId: c.user?.id,
            clientSecret: config.secret,
            redirectUri: "http://localhost:3000/auth/discord" 
        },
        express: { 
session: new SQLiteStore({
    db: "panel.db",
    type: "default",
    table: "panel"
 })
        },
        theme: dash.Themes.FLAGS.Template,
        information: {
            homepage: {
                body: [
                    {
                        title: "My bot is cool",
                        description: "Why becuse YES"
                    },
                    {
                        title: "My bot is awesome",
                        description: "Why becuse im cooler then my susssy"
                    }
                ]
            }
        }
      });
      dt.start()
})
bot.onMessage()
bot.readyCommand({ //command
    channel: "943309111892795473", //The channel where the bot will log
    code: `I am Ready with pong of $ping, \n http://localhost:3000/` //Message sent to <channel>
})
bot.command({
    name: "ping", 
    code: "Hello world i have $pingms speed! and $botping"
})
bot.command({
    name: "eval", 
    code: `$description[1;\`\`\`js\n
    $djseval[require('util').inspect($message).replace(/\`/g, "\`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));yes]\n\`\`\`]`
})
