/* This is a script to initiate a js server using 
node on localhost 

To have it running, and provided that you have 
already node installed, run

If you havent installed express on your node.js,
> npm install express
(Warning: Dependencies may be added to package.json if you 
include the --save option).

Once express is installed, then
> node server.js 
starts this script.

See 
https://expressjs.com/th/guide/routing.html
for more info.
*/

var express = require('express')
var path = require('path')
var serverapp = express();
var listeningport = 8040; /*Can be set to your preference*/

var serverPath = path.join(__dirname);

/* Since index is static */
serverapp.use(express.static(serverPath)); 

/* Render is needed if index becomes dynamic */
serverapp.get('/', function (req, res) {
	res.send(serverPath);
	/* res.render('index.html') */
}); 

serverapp.listen(listeningport, function() {
	console.log('Express server for jsdafx listening on\n https//localhost:8040')
});

