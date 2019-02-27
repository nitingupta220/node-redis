// Import the installed modules
const express = require('express');
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');

const app = express();

const port = 3001;

// create and connect redis client to local instance
const client = redis.createClient();

// Print redis error to the console
client.on('error', (err) => {
	console.log(`Error ${err}`);
});

// use responseTime as a middleware
app.use(responseTime());

// create an /api/search route
app.get('/api/search', (req, res) => {
	// extract the query from url and trim trailing spaces
	const query = req.query.query.trim();

	// Build the wikipedia api url
	const searchURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;

	// try fetching the result from Redis first in case we have it cached
	return client.get(`wikipedia:${query}`, (err, result) => {
		// if that key exist in Redis store
		if (result) {
			const resultJson = JSON.parse(result);
			return res.status(200).json(resultJson);
		} else {
			// if that key does not exist in Redis store
			// fetch directly from wikipedia API
			return axios
				.get(searchURL)
				.then((response) => {
					const responseJson = response.data;
					// save the wikipedia api response in Redis store
					client.setex(
						`wikipedia:${query}`,
						3600,
						JSON.stringify({ source: 'Redis  Cache', ...responseJson })
					);
					// send JSON response to client
					return res.status(200).json({ source: 'Wikipedia API', ...responseJson });
				})
				.catch((err) => {
					return res.json(err);
				});
		}
	});
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
