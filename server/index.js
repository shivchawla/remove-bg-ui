const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');

const {removeBg} = require('./utils');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

var corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));

app.post('/', async (req, res) => {
	try {
		const previewImage = await removeBg(req.body.data);
		return res.status(200).json({data: previewImage})	
	} catch(err) {
		console.log(err);
		return res.status(400).send(err.message);
	}
});


app.listen(port, () => {
	console.log(`Express Server running on port: ${port}`);
});
