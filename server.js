const express = require("express");
const app = express();
const PORT = 3000;

let requestTimes = [];

app.use((req, res, next) => {
	requestTimes.push(Date.now());

	requestTimes = requestTimes.filter((time) => time > Date.now() - 5000);

	if (requestTimes.length > 50) {
		return res.status(429).send("Too Many Requests - status 429");
	}

	next();
});

app.get("/api", (req, res) => {
	const delay = Math.floor(Math.random() * 1000) + 1;
	setTimeout(() => {
		res.send(req.query.index);
	}, delay);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
