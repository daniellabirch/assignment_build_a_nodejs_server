var http = require('http');
var fs = require("fs");

var hostname = '127.0.0.1';
var port = 3000; 

var server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', 'utf8', function(err, data) {
	var reqJSON = {
    	url:req.url,
    	method:req.method,
    	httpVersion:req.httpVersion,
    	headers:req.headers
	};
	  
	var resJSON = {
		statusMessage:res.statusMessage,
    	statusCode:res.statusCode,
    	_header:res._header
	};
	  
	reqJSON = JSON.stringify(reqJSON, null, 2);
	resJSON = JSON.stringify(resJSON, null, 2);
	  
	data=data.replace("{{req}}",reqJSON);
	data=data.replace("{{res}}",resJSON);
	  
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    }
	else{
      res.writeHead(200,{
        "Content-Type": "text/html"
      });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});