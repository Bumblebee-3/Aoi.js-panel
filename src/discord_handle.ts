const DiscordOauth2 = require("discord-oauth2");
const { EventEmitter } = require("events");
// const Many = require('extends-classes')
const bitfieldCalculator = require('discord-bitfield-calculator');
const DiscordError = class DiscordError extends Error {
    constructor(err, status) {
        super(err);
        let _this = this;
        this.toString = () => {
            return this.message;
        }
        this.toJSON = () => {
            return JSON.parse(JSON.stringify(_this))
        }
        this.getMessage = () => {
            return this.message;
        }
        this.getStack = () => {
            return this.stack
        }
        this.status = status;
        this.name = "DiscordError";
    }
    log() {
        console.error(this);
    }
}
 class DiscordClient  extends EventEmitter{
constructor(options, Self) {
    super()
this.clientId = options.clientId;
this.clientSecret = options.clientSecret;
this.redirectUri = options.redirectUri;
this.version = options.version || "v9";
this.client = new DiscordOauth2(this)
this.botToken = Self.bot.token;
this.self = Self;
this.scopes = options.scopes || ["identify", "guilds"]
//End
}
GetAuthUrl(req,res,next) {
    //Scopes default to this.scopes;
    // console.log(this)
const url =  this.client.generateAuthUrl({
    prompt: "none",
    state: require('crypto').randomBytes(16).toString("hex"),
    scope: this.scopes,
})
if(req && res && next) {
res.redirect(200, url)
// next()
return;
} else {
    return url;
}
}
async verify(code) {
   const d = await  this.client.tokenRequest({
        code,
        scope: this.scopes,
        grantType: "authorization_code",
        // redirectUri: "http://localhost/callback",
    })
    const UserClient = new UserDiscord(d, this.client)
    return { authorized_info: d, UserClient };
}
async authorize(req,res,next) {
const code = req.query.code;
if(!code) return res.redirect(200, "/status?code=403&r=" + encodeURIComponent("No query Code provided!!"))
console.log("authorize called", code)
try {
    const { authorized_info: info, UserClient } = await this.verify(code)
    await req.session.regenerate(() => {})
    req.session.user = info;
    // req.session.user_client = UserClient;
    // res.end();
    next()
} catch (err) {
    next(err) // let express do Me Work
}
}
session(cb) {
    let _this = this;//MY GOD JS
    return function (req,res,next) {
        if(req.session.user) req.user = new UserDiscord(req.session.user, _this.client)
    // console.log(req.session /* Checking if it is an Object<Class>*/)
    next()
    }
}
 }
class UserDiscord {
    constructor(user, oauth, scopes /* Scopes are needed to refreash the token*/) {
        this.user = user;
    this.access_token = user.access_token;
    this.refresh_token = user.refresh_token;
    // this.interval = setInterval(this.refreash, this.user.expires_in - 2)
    this.oauth = oauth;
    this.scopes = scopes;
    }
 getInfo() {
return this.oauth.getUser(this.access_token)
    }
getConnections() {
return this.oauth.getConnections(this.access_token)
}
getGuildInfo(guildId) {
    return this.oauth.getGuildMember(this.access_token, guildId)
}
async getGuilds() {
    const guilds = await this.oauth.getUserGuilds(this.access_token);
    guilds.map((g) => {
        g.permissions = bitfieldCalculator.permissions(g.permissions)
        g.permissions_new = bitfieldCalculator.permissions(g.permissions_new)
g.username = g.name;
g.icon = `https://cdn.discord.com/icons/${g.id}/${g.icon}.webp`
return g;
    })
    return guilds;
}
async refreash() {
    const d = await this.oauth.tokenRequest({
        // clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
        refreshToken: this.refresh_token,
        grantType: "refresh_token",
        scope: this.scopes,
    })    
    this.access_token = d.access_token;
    this.refresh_token = d.refresh_token;
    this.user = d;

}
}
module.exports = {
    DiscordClient, 
    DiscordError, 
    UserDiscord
}