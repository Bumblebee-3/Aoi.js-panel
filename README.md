# aoi.js-panel
## A cool package for aoi.js bot's admin panels.

# How to setup?
```js
const aoidash = require('aoi.js-panel')
const dash = new aoidash.Dash({
port: YOUR SERVER PORT,
bot: bot,
command: './commands', //your command handler
username: "username", //username to login to dashboard
password: "password" //password to login to dashboard
})
dash.start()
```
put that after your const bot
## example usage
```js
const aoi = require("aoi.js")
const bot = new aoi.Bot({
token: "token",
prefix: "!",
intents: ["GUILDS", "GUILD_MESSAGES"]
})
const aoidash = require('aoi.js-panel')
const dash = new aoidash.Dash({
port: 8080,
bot: bot,
command: './commands', //your command handler
username: "aoi.js dash", //username to login to dashboard
password: "is cool" //password to login to dashboard
})
dash.start()
```
## need example?
[Click here](https://dash.pirles.tk)

username: `user`
password: `pass`
### Project owner 
[Fight Farewell Fearless#9295]
### Collaborators
[Bumblebee#8199]
[❥ CODING WITH ARNOB ❥#0088]

