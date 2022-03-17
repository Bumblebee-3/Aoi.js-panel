const chalk = require('chalk');
const fetch = require('node-fetch');
;(async () => {
    if(process.env.JEST_WORKER_ID !== undefined) return; // Tests are running no logs
    const data = await fetch('https://registry.npmjs.com/aoi.js-panel').then(r => r.json());
    let c_version = require('../package.json').version
    let l_version = data["dist-tags"].latest;
    if(l_version === c_version) return;
    console.log(chalk.yellow(new Array(20).join('=') + "WARING FROM aoi.js-panel" + new Array(20).join('=')))
    if(c_version.slice(0,1) > l_version.slice(0,1)) { 
        console.warn(
            chalk.yellow(`You are using version ${c_version}v which is higher then ${l_version}v, which means that you are make the version to high whilst testing please set it to ${l_version}v`)
        )
    } else if(l_version.slice(0,1) > c_version.slice(0,1)) {
        console.warn(chalk.yellow(`You are using version ${c_version}, which is lower than the latest version of ${l_version}!`))
    } else {
        console.warn(chalk.yellow(`You are using ${c_version} which is not the same as ${l_version}\n try to update when you can to ${l_version}!`))
    }
    console.log(chalk.yellow(new Array(20).join('=') + "END" + new Array(20).join('=')))
    console.log(chalk.hidden('\n'))
    return;
})()