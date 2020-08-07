var fs = require('fs')
var path = require('path')
var data = new Object();
__dirname = path.resolve();

fs.readdirSync('./input').forEach(function (file) {
	let buff = fs.readFileSync(path.join(__dirname,'input',file));
	let base64data = "data:audio/mp3;base64," + buff.toString('base64');
	data[file.split(",")[0]+'.mp3'] = base64data;
    })
	fs.writeFileSync('./main.json',JSON.stringify(data))
