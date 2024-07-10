const express = require('express');
const http = require('http');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local') });

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());



app.post('/api/ongage', async (req, res) => {
    const ongageData = req.body;
    const accountCode = process.env.REACT_APP_ACCOUNTCODE;
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    console.log("accountcode " + accountCode)

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

app.post('/api/email', async (req, res) => {
    const emailData = req.body;
    const apiKey2 = process.env.REACT_APP_APIKEY2;
    console.log(apiKey2)

    try {
        const emailResponse = await axios.post('https://edapi.campaigner.com/v1/RelaySends/10722', emailData, {
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': apiKey2
            }
        });
        console.log('Email sent:', emailResponse.data);
        res.status(200).json(emailResponse.data);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
