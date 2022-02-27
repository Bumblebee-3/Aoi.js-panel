fetch("/api/stats").then(r => r.json().then(d => {
    const channels = document.querySelector("#channels")
    const servers = document.querySelector("#servers")
    const users = document.querySelector("#users")
let user_i = 0;
let ch_i = 0;
let g_i = 0;
setInterval(() => {
    if(user_i < d.users) {
        users.innerHTML = user_i
        user_i++;
        }
if(ch_i < d.channels) {
            channels.innerHTML = ch_i
            ch_i++;
}if(g_i < d.servers) {
         servers.innerHTML = g_i
         g_i++;
 }
}, 10)
}))
fetch('/api/owners').then(r=>r.json()).then(d => {
    const owners = d.owners;
    document.querySelector('#credits').innerHTML = `Copyright © [${owners.join(', ')}] - ${new Date().getFullYear()}`
})