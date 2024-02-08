const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productController = require('./products/products.controller');

const app = express();

dotenv.config(); // mengaktifkan config .env

const PORT = process.env.PORT; // get env value

app.use(cors());
app.use(express.json()); // pass res.body

// controllers
app.use('/products', productController);

app.get('/', (req, res) => {
	res.send('Welcome to API Akuuh eaa!');
});

// listen express API
app.listen(PORT, () => {
	console.log('Express API running in http://localhost:' + PORT);
});
