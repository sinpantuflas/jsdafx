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
var engines = require('consolidate')
var path = require('path')//To handle path strings
var serverapp = express();
var listeningport = 8040; //Can be set to your preference
var debug = 0;
var serverPath = path.join(__dirname);

/* Since index is static */
//serverapp.use(express.static(serverPath));

/* For other pages */
serverapp.set('views', __dirname);
serverapp.engine('html',engines.mustache);//require('ejs').renderFile)//engines.mustache)
//serverapp.set('view engine', 'html');
//serverapp.engine('html', require('ejs').renderFile);
//routr = require('express').Router();
//serverapp.use(routr);

/* Render is needed if index becomes dynamic */
serverapp.get('/', function (req, res) {
	res.sendFile(path.join(serverPath,'home.html'));
	if(debug){console.log('Get request at root');}
}); 

serverapp.get('*', function (req, res) {
	try{
		res.render(path.join(serverPath,req.originalUrl));
		//res.render(req.originalUrl);
		if(debug){console.log('Request at: ',req.originalUrl, ' with ', req.method);}
		}
	catch(err){
		try{
			if(debug){console.log('err1 Request at: ',req.originalUrl, ' with ', req.method);}
			res.sendFile(path.join(serverPath,req.originalUrl));
			//res.sendFile(req.originalUrl);
		}
		catch(err){
			if(debug){console.log('err2 Request at: ',req.originalUrl, ' with ', req.method);}
		}
	}
}); 

serverapp.all('*', function (req, res) {
	res.send(path.join(req.originalUrl));
	if(debug){console.log('err2 Request at: ',req.originalUrl, ' with ', req.method);}
});

/*
serverapp.get('/ovs.html', function (req, res) {
	res.render(path.join(__dirname,'ovs.html'),{ root : __dirname});
	if(debug){console.log('Connected to ovs\n');}
}); 

serverapp.get('/playback_control_buttons.html', function (req, res) {
	res.render('playback_control_buttons.html',{ root : __dirname});
	if(debug){console.log('Connected to playback\n');}
}); 


routr.use(':*', function(req, res, next) {
  console.log('URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Type:', req.method);
  next();
});
*/

/*

routr.get('/qds.html', function (req, res) {
	res.render('qds.html',{ root : __dirname});
	if(debug){console.log('Connected to qds\n');}
}); 
*/


serverapp.listen(listeningport, function() {
	console.log('Express server for jsdafx listening on\n https//localhost:8040')
});

