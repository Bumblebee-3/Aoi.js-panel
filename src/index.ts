/* eslint-disable linebreak-style */
// Requires as imports up-top
import { Bot } from 'aoi.js';
import {Request, Response} from 'express';
import path from 'path';
import { DashOptions, DashInterface, ThemeFlags } from "../index";
// const path = require('path');
const fs = require('fs');
const csrf = require("csurf");
const Api = require('./api');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const express = require('express');
const exec = require('child_process');
const ejs = require('ejs');
const Theme = require('./themes');
const debug = require('debug')('aoijs.panel:main');
const {DiscordClient}= require('./discord_handle.js');
require('./version_check');

class Dash implements DashInterface {
  static Session = sessions;
    constructor(ops: DashOptions) {
    let name = ops;
    let bot = name.bot;
    let port = name.port;
    let username = name.username;
    let pass = name.pass;
    let command = name.command;
    this.ops = name;
this.ownersIds = ops.owners || [];
if(this.ownersIds.length < 0) console.warn("No owners specified, nobody can access commands!")
this.information  = ops.information.homepage;
//@ts-ignore
bot.panel = this;
    this.bot = bot
this.port = port
this.username = username
if(ops.express?.store) this.store = ops.express?.store;
      this.pass = pass
      this.cmd = command
      this.api = new Api(this)
      if(!Theme.isTheme(ops.theme)) console.warn("No theme specified, using default theme")
      this.theme = ops.theme || Theme.FLAGS.default;
this.discord = new DiscordClient(ops.discord, this)
  }
  store: any;
  cmd: string;
  api: Api;
  theme: ThemeFlags;
  discord: DiscordInterface;
  information: { body: { title: string; description: string; }[]; };
  port: number;
  username: string;
  pass: string;
  ownersIds: string[];
  ops: DashOptions;
  bot: Bot;
  private renderFile(path:string, parms?:any, cb?: Function) {
 return new Promise((resolve, rej) => {
  const done = (err:string | Error| null, res:any) => {
    if(err && cb) {
      cb(err, null)
    // Promise.reject(err)
    } else if(cb && err && res) {
      cb(err, res)
    } else if(err) {
rej(err)
    } else if(res) {
resolve(res)
    } else if(err && res) {
resolve(res)
rej(err)
    }
  }
  if(!path) return done("No path provided", null);
  const file = fs.readFileSync(path);
  let res = ejs.render(file.toString(), parms)
  
done(null, res)
 })
  }
public start() {
const bot = this.bot
const port = this.port
const command = this.cmd
const user = this.username
const pass = this.pass

    const app = new express()
    
    let _this = this;
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')))
    const oneDay = 1000 * 60 * 60 * 24;
const SESSION_SECRET = encodeURI("7g2rf382vf8y2vcy8vc8yev8cyv28yvcy8evcw8yvc1&%$%*()").split('').reverse().join()
    app.use(sessions({
        secret: SESSION_SECRET, // Use Hardcoded credentials
        saveUninitialized:true,
        store: _this.store,
        cookie: { maxAge: oneDay, httpOnly: false },
        resave: false 
    }));
app.use(csrf({ cookie: true }));
    app.use(this.discord.session())
    app.use('/api/', this.api.app)
    app.get('/auth/discord/redirect', (req: Request, res: Response) => res.redirect(/* 200, */ this.discord.GetAuthUrl()))
    app.get('/command/edit', islogin, async function(req: Request, res: Response) {
       
      let pathh:string | null = req.query.path as string;
      if(!pathh) return res.status(500).end();
      let name = pathh.replace(/%2F/g, '/')
        pathh = pathh.replace(/%2F/g, ',')
        let code = fs.readFileSync(path.join(process.cwd(), pathh))
        
        res.send(_this.renderFile(path.join(__dirname, "views", "command_edit.ejs"), { code, name, pathh, req }))
        })
    
    
    
    app.post('/command/save', islogin, async function(req: Request, res: Response) {
        let name = req.body.path
       name = name.replace(/\//g, path.sep)
        let nowname = command + path.sep + req.body.name
        nowname = nowname.replace(/\//g, path.sep)
    fs.writeFileSync(process.cwd() + path.sep + name, req.body.code)
        fs.renameSync(process.cwd() + path.sep + name, process.cwd() + path.sep + nowname)
        let nowpath = nowname
       
        res.redirect(/* 200, */ `/command/edit?path=${nowpath.replace('./', '').replace('/','')}`)
    })
    
    
    app.get('/login', login,async function(req: Request, res: Response) {

        res.send(await _this.renderFile(path.join(__dirname, "views", "login.ejs")))
        
        })
        app.get('/', async function(req: Request, res: Response) {
res.send(await _this.renderFile(path.join(Theme.getPath(_this.theme), "index.ejs"),{ info: _this.information, bot }) )
        })
    
    app.get('/auth/discord', async (req: Request, res: Response, next: Function) => await this.discord.authorize(req,res,next), (req: Request, res: Response) => {
      res.redirect(/* 200, */ '/dash')
    })
    app.post('/auth', async function(req: Request, res: Response) {
        let username = req.body.username
        let password = req.body.password
        if(username==user && password==pass) {
          //@ts-ignore
            req.session.user = username
            //@ts-ignore
            req.session.pass = password
            res.redirect(/* 200, */ '/dash')
            }
        else{
       res.redirect(/* 200, */ '/')
            }
        })
    
             
 
    
    
    
    app.get('/dash', islogin, async(req: Request, res: Response) => {
    
    let user = await bot.users.fetch('694184230271451166')
     let author = user.username + "#" + user.discriminator
    let user2 = await bot.users.fetch('826320581518557194')
     let author2 = user2.username + "#" + user2.discriminator
        res.send(await _this.renderFile(path.join(__dirname, "views", "dash.ejs"), { author2, author, req, user, user2, bot  }))
        })
        
    
    app.get('/command', islogin, async(req: Request, res: Response) => {
        let text = ''
        return res.redirect('/status?code=501&r=Not%20Fixed')
 try{       
async function *walkSync(dir:string):any {
  console.log(dir)
  const files = fs.readdirSync(dir.toString(), { withFileTypes: true });
  for (const file of files) {
    console.log("\t"+path.join(dir, file.name.toString()))
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name.toString()));
    } else {
     yield path.join(dir, file.name.toString());
    }
  }
  return [];
}
let ff = []
for (const filePath of walkSync(command)) {
  ff.push(filePath);
}
  
for(const rr of ff) {
   let pathh = encodeURIComponent(rr)//rr.replace(/\//g, "%2F")
    /*text += `<li><a href="/command/edit?path=${pathh}">
<button type="button"> <img src="https://cdn.discordapp.com/emojis/837524136837251093.png" width="150" height="50"/><br>
${rr}</button></a></li>`*/
    text += `<label><li>
<a href="/command/edit?path=${pathh}"><input type="image" name="guild" src="https://cdn.discordapp.com/emojis/837524136837251093.png" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://cdn.discordapp.com/emojis/837524136837251093.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${rr}</p></b></a></li></label>`
    }
     }
        catch(e) {
     text = "path is invalid or error occurred"
            }
        res.send(await _this.renderFile(path.join(__dirname, 'views', 'command.ejs'), { text, req }))
        })
    
    
    app.get('/guild',islogin, async function (req: Request, res: Response) {
        let guild = ''
        let server = bot.guilds.cache.toJSON()
 for(let i = 0;i<server.length;i++){
 /*guild += `<li><a href="/guild/info?id=${server[i].id}">
<button type="button"> <img src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150" /><br>
${server[i].name}</button></a></li>`*/
 guild += `<label><li>
<a href="/guild/info?id=${server[i].id}"><input type="image" name="guild" value="${server[i].id}" src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${server[i].name}</p></b></a>
              </li></label>`

     }
     res.send(await _this.renderFile(path.join(__dirname, 'views', 'guild.ejs'), { guild }))
   
        })
    
   
    app.get('/guild/info', islogin, async function (req: Request, res: Response) {
        let info = ''
        try {
          if(!req.query.id) return res.redirect('/status?code=400&message=No%20ID%20Provided')
let guild = bot.guilds.cache.get(req.query.id as string)
if(!guild) return res.redirect('/status?code=404&message=Guild%20Not%20Found');
info = `Id: ${guild.id}<br>Name: ${guild.name}<br>Owner Id: ${guild.ownerId}<br>Members count: ${guild.memberCount}<br>Features: ${guild.features.join(', ')}`
            }
        catch (e) {
            info = "error occurred: " + e
            }
        res.send(await _this.renderFile(path.join(__dirname, 'views', "guild_info.ejs"), { req, res, bot, info }))

        })
    
    
    app.get('/command/update',islogin, async function(req: Request, res: Response) {
      //@ts-ignore 
      bot.loader?.update()
        res.redirect(/* 200, */ '/command')
        })
    
    app.get('/command/create', islogin, async function(req: Request, res: Response) {
        res.send(await _this.renderFile(path.join(__dirname, "views", "command_create.ejs")))
        }) 
    
    app.post('/command/create', islogin, async function(req: Request, res: Response) {
        try{
        let nowname = command + '/' + req.body.name
        nowname = nowname.replace(/\//g, path.sep)
   nowname = nowname.replace('./','')
        fs.writeFileSync(process.cwd() + path.sep + nowname, req.body.code)
        const nowpath = nowname.replace(/,/g, '%2F')
       
        res.redirect(/* 200 ,*/ `/command/edit?path=${nowpath}`)
            }
        catch (e) {
          res.send(await _this.renderFile(path.join(__dirname, "views", "error.ejs"), { e }))
            }
    })
    
    
    
   app.get('/command/delete', islogin, async function(req: Request, res: Response) {
       try {
           let pathh:string | null = req.query.path as string
           if(!pathh) return res.redirect(`/status?code=400&message=No%20Path%20Provided`);
           pathh = pathh.replace(/%2F/g, path.sep)
           fs.unlinkSync(path.join(process.cwd(), pathh))
           res.redirect(/* 200, */ '/command')
           }
       catch (e) {
       res.send(await _this.renderFile(path.join(__dirname, "views", "error.ejs"), { e }))
       }

       })
    
    app.get('/guild/leave', islogin, async function (req: Request, res: Response) {
        try { 
            bot.guilds.cache.get(req.query.id as string)?.leave()
            res.redirect(/* 200, */ '/guild')
            }
        catch (e) {
          res.send(await _this.renderFile(path.join(__dirname, "views", "error.ejs"), { e }))

            }
        })
    
    
    
 app.get('/status' ,async function (req: Request, res: Response, next: Function) {
  const statusCode:number = req.query.code? parseInt( req.query.code as string) :  200
  res.status(statusCode)
       res.send(await _this.renderFile(path.join(__dirname, "views", "status.ejs")))
        })
    
    app.get('/shell', islogin, async(req: Request, res: Response) => {
      res.send(await _this.renderFile(path.join(__dirname, "views", "shell.ejs")))

    })
    
    app.post('/shell', islogin, async(req: Request, res: Response) => {
      let result:any = '';
        try {
            result = await exec.execSync(`${req.body.execute}`).toString().replace(/\n/g, '<br>')
            }
        catch (e) {
            result = e
            }
      res.send(await _this.renderFile(path.join(__dirname, "views", "shell_result.ejs"), { result, req }))

    })
    // app.get('/login-c', async (req,res) => {
    //   res.send(await _this.renderFile(path.join(__dirname, 'views', "login_c.ejs")))
    // })
    app.get('/djseval', islogin, async(req: Request, res: Response) => {
      res.send(await _this.renderFile(path.join(__dirname, "views", "djseval.ejs")))

    })
    
    app.post('/djseval', islogin, async(req: Request, res: Response) => {
      let result;
let text  = ("\n"+req.body.execute+"\n")
        try {
            const client = bot
            result = await eval(text)
        
            }
        catch (e) {
            result = e
            }
      res.send(await _this.renderFile(path.join(__dirname, "views", "djseval_res.ejs"), { util: require('util'), req, result, path: "/djseval" }))


    })
    
    
     app.get('/aoieval', islogin, async(req: Request, res: Response) => {
      res.send(await _this.renderFile(path.join(__dirname, "views", "aoi_eval.ejs")))

    })
    
    app.post('/aoieval', islogin, async(req: Request, res: Response) => {
      let result;
        try {
            const client = bot
      //@ts-ignore
    result = await client.functionManager.interpreter(
                    client,
                    {},
                    [],
                    {
                      name: "aoi Eval",
                    code: `${req.body.execute}`,
                    },
                    client.db,
                    true,
                )

        result = result.code
            }
        catch (e) {
            result = e
            }
      res.send(await _this.renderFile(path.join(__dirname, "views", "djseval_res.ejs"), { result, req, util: require('util'), path: "/aoieval"}))

    })
    
    
   app.get('/reboot', islogin, async(req: Request, res: Response) => {
     
      await res.send(_this.renderFile(path.join(__dirname, "views", "reboot.ejs")))

       
       process.on("exit", () => {
           
           exec.spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        process.exit();
       })
    
    async function islogin(req: Request, res: Response, next:Function) {
      // if(process.argv.length > 2) return next() 
      if(req.user && !req.url.includes('/owner')){
            return next()
            }
     else {
         res.redirect(/* 200, */ '/')
         }
        }
    
    
    async function login(req,res,next) {
        if(!req.user){
            return next()
            }
     else {
         res.redirect(/* 200, */ '/dash')
         }
        }
    app.use("*", async (req,res,next) => {
      console.log("404", req)
      res.redirect(/* 200, */ "/status?code=404&r=" + encodeURIComponent(`Cannot ${req.method} on path ${req.url}`))
    }, (err,req,res,next) => {
      res.redirect(/* 200, */ "/status?code=500&r=" + encodeURIComponent(`Error:\n${require('util').inspect(err)}`))
    })
    app.listen(port)
    console.log("dashboard ready in port: "+port)
    }
}
export const Dashboard = Dash;
// export default {
//   Dash,
//   Themes: Theme
// }
export const Themes = Theme;
