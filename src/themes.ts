const path = require('path')
module.exports = class Themes {
    static FLAGS = {
        default: 0,
        Template: 1
    }
    static getPath(theme) {
        const name = this.getName(theme);
        return path.join(__dirname, "views", name);
  
    }
    static getName(theme) {
if(theme === this.FLAGS.default) return "basic";

if(theme === this.FLAGS.Template) return "Discord-bot-template";
    }
    static isTheme(theme) {
        if(!Object.values(this.FLAGS).includes(theme)) return false;
        return true;
    }
}