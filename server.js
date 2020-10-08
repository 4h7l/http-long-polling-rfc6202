const http = require('http');

let responses = [];

http.createServer(function(req, res) {
	if(req.method === 'POST') {
		let body = Buffer.from([]);

		req.on('data', function(chunk) {
			body += Buffer.concat([body, chunk]);
		});

		req.on('end', function() {
			for(let [i, response] of responses.entries()) {
				response.end(body.toString());
			}
			
			responses = [];
			res.end();
		});

		return;
	}

	responses.push(res);
}).listen(8080);
