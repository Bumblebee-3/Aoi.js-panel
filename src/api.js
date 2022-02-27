const express = require('express');
module.exports = class Api {
    constructor(Self) {
        this.self = Self;
        this.app = express();
        this.app.get('/stats', async (req,res) => {
            const channels = Self.bot.channels.cache.size
            const users =   Self.bot.users.cache.size
            const servers =  Self.bot.guilds.cache.size
            // console.log({ servers, channels, users })
            res.json({
servers, channels, users
            })
        })
        this.app.get('/owners', async (req,res) => {
            res.json({
                owners: Self.ops.ownersIds || Self.bot.application.owner.members ? Self.bot.application.owner.members.map((u) => `${u.user.username}#${u.user.discriminator}`) : [Self.bot.application.owner.tag]
            })
        })

    }
}