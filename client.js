const http = require('http');

const SERVER_URL = 'http://localhost:8080';

async function subscribe() {
	console.log('Waiting...');
	return new Promise(function(resolve, reject) {
		http.get(SERVER_URL, function(response) {
			let data = Buffer.from([]);

			response.on('data', function(chunk) {
				data += Buffer.concat([data, chunk]);
			});

			response.on('end', async function() {
				console.log('From server: ' + data.toString());
				resolve();
				await subscribe();
			});
		});

	});
}

subscribe();
