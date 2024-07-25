const express = require('express');
const http = require('http');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const API_ONGAGE_URL = 'https://api.ongage.net/167360/api/v2/'
const API_CAMPAIGNER_URL = 'https://edapi.campaigner.com/v1/';
const API_DYNAMIC_EMAIL_TEMPLATE_URL = 'https://edapi.campaigner.com/v1/';

dotenv.config({ path: path.join(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local') });

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d' 
    })
  ],
});

app.use(expressWinston.logger({
  transports: [
    new DailyRotateFile({
      filename: 'logs/http-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d' // Keep logs for 5 days
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));


app.post('/api/ongage', async (req, res) => {
  const ongageData = req.body;
  const accountCode = process.env.REACT_APP_ACCOUNTCODE;
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

  try {
    const ongageResponse = await axios.post(API_ONGAGE_URL + 'contacts', ongageData, {
      headers: {
        'Content-Type': 'application/json',
        'x_account_code': accountCode,
        'x_username': username,
        'x_password': password
      }
    });
    logger.info('Ongage User created:', ongageResponse.data);
    res.status(200).json(ongageResponse.data);
  } catch (error) {
    logger.error('Error creating Ongage user:', error);
    res.status(500).json({ error: 'Failed to create Ongage user' });
  }
});

app.post('/api/campaigner', async (req, res) => {
  const campaignerData = req.body;
  const apiKey = process.env.REACT_APP_APIKEY;
  try {
    const campaignerResponse = await axios.post(API_CAMPAIGNER_URL + 'Subscribers', campaignerData, {
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': apiKey
      }
    });
    logger.info('Campaigner user created:', campaignerResponse.data);
    res.status(200).json(campaignerResponse.data);
  } catch (error) {
    logger.error('Error creating Campaigner user:', error);
    res.status(500).json({ error: 'Failed to create Campaigner user' });
  }
});

app.post('/api/send_email', async (req, res) => {
  const emailData = req.body;
  const apiKey2 = process.env.REACT_APP_APIKEY2;

  try {
    const emailResponse = await axios.post(API_CAMPAIGNER_URL + 'RelaySends/10722', emailData, {
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': apiKey2
      }
    });
    logger.info('Email sent:', emailResponse.data);
    res.status(200).json(emailResponse.data);
  } catch (error) {
    logger.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
