const express = require('express');
const http = require('http');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');

dotenv.config({ path: path.join(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local') });

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
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
  
  // Log HTTP requests
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
    logger.info(`accountcode: ${accountCode}`);
  
    try {
      const ongageResponse = await axios.post('https://api.ongage.net/167360/api/v2/contacts/', ongageData, {
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
      const campaignerResponse = await axios.post('https://edapi.campaigner.com/v1/Subscribers', campaignerData, {
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
  
  app.post('/api/email', async (req, res) => {
    const emailData = req.body;
    const apiKey2 = process.env.REACT_APP_APIKEY2;
    logger.info(emailData);
  
    try {
      const emailResponse = await axios.post('https://edapi.campaigner.com/v1/RelaySends/10722', emailData, {
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': apiKey2
        }
      });
      logger.info('Email sent:', emailResponse.data);
      res.status(200).json(emailResponse.data);
    } catch (error) {
      logger.error('Error sending email:', error);
      res.status(500).json({ error: error});
    }
  });

  app.get('/api/template', async (req, res) => {
    const token = process.env.REACT_APP_TOKEN; 
    const template_id = process.env.REACT_APP_TEMPLATE_ID;
    const { keyword, location, name } = req.query;

    if (!keyword || !location || !name || !token || !template_id) {
        logger.warn('Missing required query parameters');
        console.log('Missing required query parameters')
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    const url = `https://parser.careerhotshot.com/syndication/email/create?token=${token}&template_id=${template_id}&keyword=${keyword}&location=${location}&jpp=5&from=email&first_name=${name}`;
    console.log(`Constructed URL: ${url}`)
    logger.info(`Constructed URL: ${url}`);

    try {
        const response = await axios.get(url);
        logger.info('Template fetched successfully');
        console.log('Template fetched successfully')
        res.status(200).send(response.data);
    } catch (error) {
        logger.error('Error fetching template:', error);
        console.log('Error fetching template:', error);
        res.status(500).json({ error: 'Failed to fetch template' });
    }
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
