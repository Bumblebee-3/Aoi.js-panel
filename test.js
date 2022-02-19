const dash=require("./src/index.js");
const aoi = require("aoi.js")
const config = require('./config.json')
const bot = new aoi.Bot({
token: config.token, // Grab Token From CLI
prefix: "!",
intents: ["GUILDS", "GUILD_MESSAGES"]
})
bot.on('ready', (c) => {
    const dt = new dash.Dash({
        bot:bot,
        port:3000,
        username:"neon",
        password: config.pass,
        command:"./commands/",
        discord: {
            clientId: c.user.id,
            clientSecret: config.secret,
            redirectUri: "http://localhost:3000/auth/discord" 
        },
        db: {
            db: "panel.db",
            table: "panell"
        }
      });
      dt.start()
})
bot.onMessage()
bot.readyCommand({ //command
    channel: "943309111892795473", //The channel where the bot will log
    code: `I am Ready with pong of $ping, \n ` //Message sent to <channel>
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
