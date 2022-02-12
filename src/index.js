

class Dash {
  constructor(name) {
    let bot = name.bot;
    let port = name.port;
    let username = name.username;
    let pass = name.password;
    let command = name.command;
    this.port = port;
    

    dash_start(bot,port,command,username,pass);
  }
}


function dash_start(bot,port,command,user,pass) {

    const path = require('path')
    const fs = require('fs')
    
    
    const express = require('express')
    const app = new express()
    
    
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    const sessions = require('express-session')
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(sessions({
        secret: "aoijsdashboardisepictbh10101000",
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: false 
    }));
    
    
    app.get('/command/edit', islogin, function(req,res) {
        let pathh = req.query.path
        let name = pathh.replace(/%2F/g, '/')
        pathh = pathh.replace(/%2F/g, ',')
        let code = fs.readFileSync(path.join(process.cwd(), pathh))
        res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
<link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">


<head>
<title>EDIT COMMAND</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<form action='/command/save' method='post'>
            <input type="hidden" name="path" value="${req.query.path}">
            <input type="text" name="name" placeholder="Command name" value="${name.replace(command.replace('./', '') ,'')}" required>
            <br>
           
<textarea name="code" id="code" placeholder="your aoi.js code">${code}</textarea>
			
<button class="btn" type="submit">Save!</button>
<br>
<br> <br>
<a href="/command/delete?path=${req.query.path}" onclick="return confirm('Are you sure want to delete this file?')">

<button type="button" style="text-align:center;background-color:red">Delete This file for permanent!</button></a>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

<script>
window.onload = function () {
    var editor = CodeMirror.fromTextArea($("#code")[0], {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        theme: 'monokai'
    });
};
</script>


</body>
</html>


`)
        })
    
    
    
    app.post('/command/save', islogin, function(req,res) {
        let name = req.body.path
       name = name.replace(/\//g, path.sep)
        let nowname = command + path.sep + req.body.name
        nowname = nowname.replace(/\//g, path.sep)
    fs.writeFileSync(process.cwd() + path.sep + name, req.body.code)
        fs.renameSync(process.cwd() + path.sep + name, process.cwd() + path.sep + nowname)
        let nowpath = nowname
       
        res.redirect( `/command/edit?path=${nowpath.replace('./', '')}`)
    })
    
    
    app.get('/', login, function(req,res) {

        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD LOGIN</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
		.login-form {
			width: 300px;
			margin: 0 auto;
			font-family: Tahoma, Geneva, sans-serif;
		}
		.login-form h1 {
			text-align: center;
			color: #4d4d4d;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.login-form input[type="password"],
		.login-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.login-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<div class="login-form">
			<h1>Admin Login</h1>
			<form action="auth" method="POST" encType="application/x-www-form-urlencoded">
				<input type="text" name="username" placeholder="Username" required>
				<input type="password" name="password" id="password" placeholder="Password" required>
                <input type="checkbox" onclick="show()">Show Password
  <script>
     function show() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}               
      </script>
				<input type="submit">
			</form>
            
		</div>

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`)
        })
    
    
    app.post('/auth', function(req,res) {
        let username = req.body.username
        let password = req.body.password
        if(username==user && password==pass) {
            req.session.user = username
            req.session.pass = password
            res.redirect('/dash')
            }
        else{
       res.redirect('/')
            }
        })
    
             
 
    
    
    
    app.get('/dash', islogin, async(req,res) => {
    let user = await bot.users.fetch('694184230271451166')
     let author = user.username + "#" + user.discriminator
        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
		.login-form {
			width: 300px;
			margin: 0 auto;
			font-family: Tahoma, Geneva, sans-serif;
		}
		.login-form h1 {
			text-align: center;
			color: #4d4d4d;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.login-form input[type="password"],
		.login-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.login-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

Hi, thanks for using this dashboard. <br> your bot: "${bot.user.username}" is now connected to this dashboard. <br> you can contol your bot with this dashboard <br> <br> Credit: ${author}

<br> <br> <br>
<a href="/reboot" onclick="return confirm('Are you sure want to restart the server?')">
<button type="button" style="text-align:center;background-color:red">Restart server</button></a>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`)
        })
        
    
    app.get('/command', islogin, async(req,res) => {
        let text = ''
 try{       
function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}
let ff = []
for (const filePath of walkSync(command)) {
  ff.push(filePath);
}
  
for(const rr of ff) {
   let pathh = rr.replace(/\//g, "%2F")
    text += `<li><a href="/command/edit?path=${pathh}">
<button type="button"> <img src="https://cdn.discordapp.com/emojis/837524136837251093.png" width="150" height="50"/><br>
${rr}</button></a></li>`
    }
     }
        catch(e) {
     text = "path is invalid or error occurred"
            }
        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD COMMAND</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
		.login-form {
			width: 300px;
			margin: 0 auto;
			font-family: Tahoma, Geneva, sans-serif;
		}
		.login-form h1 {
			text-align: center;
			color: #4d4d4d;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.login-form input[type="password"],
		.login-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.login-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>
<a href="/command/update">
<button type="button" style="text-align:center;background-color:red">Update Command</button></a> <a href="/command/create">

<button type="button" style="text-align:center;background-color:blue">Create new command!</button></a>
<br>
<h1>You can click the image to open your command editor</h1>
<br>
<input type="search" id="search" onkeyup="search()" placeholder="Search command file">
    <ul id="list">
${text}
    </ul>
  </div>

<script>
function search() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`)
        })
    
    
    app.get('/guild',islogin, function (req,res) {
        let guild = ''
        let server = bot.guilds.cache.map(z=>z)
 for(let i = 0;i<server.length;i++){
 /*guild += `<li><a href="/guild/info?id=${server[i].id}">
<button type="button"> <img src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150" /><br>
${server[i].name}</button></a></li>`*/
 guild += `<label><li>
<a href="/guild/info?id=${server[i].id}"><input type="image" name="guild" value="${server[i].id}" src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${server[i].name}</p></b></a>
              </li></label>`

     }
     res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD GUILD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>
<h1>List all guild your bot is in, you can click the picture to look into guild info</h1>
<br>
<div style="text-align: center;">
<input align=center type="search" id="search" onkeyup="search()" placeholder="Search Guild Name">
    <ul id="list">
${guild}
    </ul>
  </div>
</div>
<script>
function search() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`)
   
        })
    
   
    app.get('/guild/info', islogin, function (req,res) {
        let info = ''
        try {
let guild = bot.guilds.cache.get(req.query.id)
info = `Id: ${guild.id}<br>Name: ${guild.name}<br>Owner Id: ${guild.ownerId}<br>Members count: ${guild.memberCount}<br>Features: ${guild.features.join(', ')}`
            }
        catch (e) {
            info = "error occurred: " + e
            }
        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>GUILD INFO</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

${info}
<br> <br> <br>
<a href="/guild/leave?id=${req.query.id}" onclick="return confirm('Are you sure want to leave ${bot.guilds.cache.get(req.query.id).name} guild?')">

<button type="button" style="text-align:center;background-color:red;height:30;width:30">Leave This Guild!</button></a>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`)

        })
    
    
    app.get('/command/update',islogin, function(req,res) {
        bot.loader?.update()
        res.redirect('/command')
        })
    
    app.get('/command/create', islogin, function(req,res) {
        res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
<link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">


<head>
<title>EDIT COMMAND</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<form action='/command/create' method='post'>
            <input type="text" name="name" placeholder="Command name" value="your command name.js" required>
            <br>
           
<textarea name="code" id="code" placeholder="your aoi.js code"></textarea>
			
<button class="btn" type="submit">Create</button>

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

<script>
window.onload = function () {
    var editor = CodeMirror.fromTextArea($("#code")[0], {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        theme: 'monokai'
    });
};
</script>


</body>
</html>


`)
        }) 
    
    app.post('/command/create', islogin, function(req,res) {
        try{
        let nowname = command + '/' + req.body.name
        nowname = nowname.replace(/\//g, path.sep)
   nowname = nowname.replace('./','')
        fs.writeFileSync(process.cwd() + path.sep + nowname, req.body.code)
        let nowpath = nowname.replace(/,/g, '%2F')
       
        res.redirect( `/command/edit?path=${nowpath}`)
            }
        catch (e) {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

ERROR OCCURRED: ${e}

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

            }
    })
    
    
    
   app.get('/command/delete', islogin, function(req,res) {
       try {
           let pathh = req.query.path
           pathh = pathh.replace(/%2F/g, path.sep)
           fs.unlinkSync(path.join(process.cwd(), pathh))
           res.redirect('/command')
           }
       catch (e) {
       res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

ERROR OCCURRED: ${e}

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 
       }

       })
    
    app.get('/guild/leave', islogin, function (req,res) {
        try { 
            bot.guilds.cache.get(req.query.id).leave()
            res.redirect( '/guild')
            }
        catch (e) {
            res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

Failed to leave guild with reason: ${e}

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

            }
        })
    
    
    
 app.get('/404', islogin ,function (req,res,next) {
        res.status(404)
       res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

404 Not Found

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

        })
    
    app.get('/shell', islogin, async(req, res) => {
      res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<form action="shell" method='post' autocomplete='off'>
<input autocomplete="false" type="text" name="hidden" style="display:none">

<input type='text' name='execute' placeholder='Type command to send to server' autocomplete='false' style="width:50">
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

    })
    
    app.post('/shell', islogin, async(req, res) => {
      const exec = require('child_process')
      let result = '';
        try {
            result = await exec.execSync(req.body.execute).toString().replace(/\n/g, '<br>')
            }
        catch (e) {
            result = e
            }
      res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>
<p style="padding: 10px; border: 2px solid white;">${result}</p>
<form action="shell" method='post' autocomplete='off'>
<input autocomplete="false" type="text" name="hidden" style="display:none">

<input type='text' placeholder='Type command to send to server' autocomplete='false' name='execute' style="width:50">
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

    })
    
    app.get('/djseval', islogin, async(req, res) => {
      res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>

<link rel="stylesheet"

  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<form action="djseval" method='post' autocomplete='off'>
<textarea name='execute' id='execute' placeholder='Your node js code here' autocomplete='false'></textarea>
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>
<script>

window.onload = function () {

    var editor = CodeMirror.fromTextArea($("#execute")[0], {

        lineNumbers: true,

        lineWrapping: true,

        mode: 'javascript',

        theme: 'monokai'

    });

};

</script>
</body>
</html>
`) 

    })
    
    app.post('/djseval', islogin, async(req, res) => {
      let result;
        try {
            const client = bot
            result = await eval(req.body.execute)
        
            }
        catch (e) {
            result = e
            }
      res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>

<link rel="stylesheet"

  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<p style="padding: 10px; border: 2px solid white;">${require('util').inspect(result, {depth:0}).replace(/\n/g, '<br>')}</p>
<form action="djseval" method='post' autocomplete='off'>
<textarea placeholder='Type command to send to server' autocomplete='false' name='execute' id='execute'>${req.body.execute}</textarea>
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>
<script>
window.onload = function () {
    var editor = CodeMirror.fromTextArea($("#execute")[0], {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        theme: 'monokai'
    });
};
</script>
</body>
</html>
`) 

    })
    
    
     app.get('/aoieval', islogin, async(req, res) => {
      res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>

<link rel="stylesheet"

  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<form action="aoieval" method='post' autocomplete='off'>
<textarea name='execute' id='execute' placeholder='Your aoi js code here' autocomplete='false'></textarea>
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>
<script>

window.onload = function () {

    var editor = CodeMirror.fromTextArea($("#execute")[0], {

        lineNumbers: true,

        lineWrapping: true,

        mode: 'javascript',

        theme: 'monokai'

    });

};

</script>
</body>
</html>
`) 

    })
    
    app.post('/aoieval', islogin, async(req, res) => {
      let result;
        try {
            const client = bot
      
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
      res.send(`
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>

<link rel="stylesheet"

  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

<p style="padding: 10px; border: 2px solid white;">${require('util').inspect(result, {depth:0}).replace(/\n/g, '<br>')}</p>
<form action="aoieval" method='post' autocomplete='off'>
<textarea placeholder='Type command to send to server' autocomplete='false' name='execute' id='execute'>${req.body.execute}</textarea>
<input type='submit' value='Send!'>
</form>
<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>
<script>
window.onload = function () {
    var editor = CodeMirror.fromTextArea($("#execute")[0], {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        theme: 'monokai'
    });
};
</script>
</body>
</html>
`) 

    })
    
    
   app.get('/reboot', islogin, async(req,res) => {
     
      await res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DASHBOARD</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
              background-color: #001f3f;
                color: #F5F5F5;
                    }
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
</head>
<body>

<div class="topnav" id="myTopnav">
  <a href="/dash" class="active">Dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

The server/process is restarting, this dashboard should be offline for a few seconds, if your bot not coming online for a more than 2 minute, you can check it on your hosting panel

<script>
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
</script>

</body>
</html>
`) 

       
       process.on("exit", () => {
           
           require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        process.exit();
       })
    
    function islogin(req,res,next) {
        if(req.session.user==user && req.session.pass==pass){
            return next()
            }
     else {
         res.redirect('/')
         }
        }
    
    
    function login(req,res,next) {
        if(req.session.user!=user || req.session.pass!=pass){
            return next()
            }
     else {
         res.redirect('/dash')
         }
        }
    
    app.listen(port)
    console.log("dashboard ready in port: "+port)
    }

module.exports = {
  Dash
}
