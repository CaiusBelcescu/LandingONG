const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, `.env.local`) });

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/api/ongage', async (req, res) => {
    const ongageData = req.body;
    const accountCode = process.env.REACT_APP_ACCOUNTCODE;
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    console.log("accountcode "+accountCode)

    try {
        const ongageResponse = await axios.post('https://api.ongage.net/167360/api/v2/contacts/', ongageData, {
            headers: {
                'Content-Type': 'application/json',
                'x_account_code': accountCode,
                'x_username': username,
                'x_password': password
            }
        });
        console.log('Ongage User created:', ongageResponse.data);
        res.status(200).json(ongageResponse.data);
    } catch (error) {
        console.error('Error creating Ongage user:', error);
        res.status(500).json({ error: 'Failed to create Ongage user' });
    }
});

app.post('/api/campaigner', async (req, res) => {
    const campaignerData = req.body;
    const apiKey = process.env.REACT_APP_APIKEY;
    try {
        const campaignerResponse = await axios.post('https://edapi.campaigner.com/v1/Subscribers', campaignerData, {
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': apiKey
            }
        });
        console.log('Campaigner user created:', campaignerResponse.data);
        res.status(200).json(campaignerResponse.data);
    } catch (error) {
        console.error('Error creating Campaigner user:', error);
        res.status(500).json({ error: 'Failed to create Campaigner user' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});
