# LandingONG
 
For instalation of the packages run the command: ```npm install```

Because the google authentification is on, the user should go on the https://console.cloud.google.com. Create an account and folow the next steps 
Create a New Project in Google Cloud Console:

Go to the Google Cloud Console.
Sign in with your Google account.
Click on the project drop-down at the top of the page and select "New Project."
Name your project and click "Create."
Enable Google APIs:

With your project selected, navigate to the API & Services dashboard.
Click "Enable APIs and Services."
Search for "Google Identity Toolkit API" or "Google OAuth API" and enable it.
Create OAuth 2.0 Credentials:

Go to the Credentials page.
Click "Create Credentials" and select "OAuth 2.0 Client IDs."
You may be prompted to configure the OAuth consent screen first. If so, follow the steps to set up your consent screen:
Provide the necessary information, including application name and email address.
Add scopes that your application will use (like email, profile).
Add test users if the app is still in development.
Once the consent screen is configured, proceed to create the OAuth 2.0 Client ID:
Choose "Web application" as the application type.
Add the authorized redirect URIs (e.g., http://localhost:3000 if you're developing locally).
Click "Create."
Retrieve Client ID:


Client_ID should be saved in an .env.local

After creating the credentials, you will see a client ID and a client secret. Copy the client ID.
You can always find your client ID later by returning to the Credentials page and selecting your OAuth 2.0 Client ID.

To run the project ```npm start```


On the API part an env .env.local file is neded with :
```
REACT_APP_APIKEY=
REACT_APP_APIKEY2=
REACT_APP_ACCOUNTCODE=
REACT_APP_USERNAME=
REACT_APP_PASSWORD=
REACT_APP_TOKEN=
REACT_APP_TEMPLATE_ID=
```
On the ongagelanding an en .env.local file neded with :
```
REACT_APP_CLIENT_ID=
REACT_APP_RECAPTCHA_SITE_KEY=
```

To install all dependencies run ```npm install```
Run API with ```npm run dev```



To run with docker there are three steps:
1. Pull the latest version ```git pull```
2. Create an image with docker ```docker build -t landingong-app .```
3. Run docker ( this command gets the logs form docker logs and -it lets the user kill it while insight ) ```docker run -v $PWD/logs:/app/API/logs -it -p 8080:8080 -p 5000:5000 landingong-app```
