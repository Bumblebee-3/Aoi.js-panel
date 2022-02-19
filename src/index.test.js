const dash=require("./index.js");
const aoi = require("aoi.js")
const bot = new aoi.Bot({
token: process.argv.slice(2)[0], // Grab Token From CLI
prefix: "!",
intents: ["GUILDS", "GUILD_MESSAGES"]
})
const dt = new dash.Dash({
  bot:bot,
  port:3000,
  username:"OHHHH",
  pass:"ae",
  command:"./commands/"
});

