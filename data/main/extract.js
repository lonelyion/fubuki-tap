var fs = require('fs')
var data = require('./main.json');
fs.rmdirSync('./output');
//var data = JSON.parse(fs.readFileSync('./main.json'));
console.log(data.length);
for(var i in data)
{
	let buff = new Buffer(data[i].split(",")[1], 'base64');
	fs.writeFileSync('./output/'+i, buff);
}