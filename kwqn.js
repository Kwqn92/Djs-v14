const {Client, Routes, REST, Collection} = require('discord.js');
const client = new Client({intents:519});
const fs = require('fs');
const data = require('mongoose');

const {token, mongoDB} = require("./kwqn.config.json")


data.connect(mongoDB)
.then(() => console.log("Mongo bağlantısı başarılı"))
.catch(err => console.log("Mongo bağlantısı başarısız oldu: "+err));

global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);
        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             type: props.type,
        })
        console.log(`Komut Yüklendi: ${props.name}`);
    });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});
//#endregion
//#region KOMUTLAR SET
client.on('ready', async(interaction) => {


})
//#endregion
client.login(token)
.then(() => console.log(client.user.username + " Giriş yaptı"))
.catch(err => console.log(`Bot hata verdi!` + err) )