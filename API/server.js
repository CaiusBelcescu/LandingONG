const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/api/*', (req, res) => {
    const url = req.originalUrl.replace('/api/', '');
    req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});
