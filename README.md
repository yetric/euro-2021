# EURO 2021 - fotbollsfeber

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
1. Java Runtime Environment 1.8+  https://java.com/en/download/manual.jsp download and install java
2. Install Node.js v12.12.0 or higher  For windows: https://nodejs.org/dist/latest-v12.x/node-v12.22.1-x64.msi

### Clone Install Setup Configure
- First of all clone the github-repository (we do feature-branches and Pull Requests)

```
git clone ...
```

- Install dependencies

```
cd project
npm install
```
- Configure Firebase. Create a file in project root called .env
   (there is a .env.example file you can copy to a new .env.local ) Get the env credentials by talking to the team.
   The .env file will contain secrets that should never be compromised. Don't commit them.

```
REACT_APP_ENVIRONMENT=localhost
REACT_APP_FIREBASE_API_KEY=????
REACT_APP_FIREBASE_AUTH_DOMAIN=????
REACT_APP_FIREBASE_DATABASE_URL=????
REACT_APP_FIREBASE_PROJECT_ID=????
REACT_APP_FIREBASE_STORAGE_BUCKET=????
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=????
REACT_APP_FIREBASE_APP_ID=????
REACT_APP_FIREBASE_MEASUREMENT_ID=????
REACT_APP_FIREBASE_USE_LOCALHOST_EMULATORS=true
```
- Set up Firebase CLI (Command Line Interface). You'll need a Node.js environment to write functions, and you'll need the Firebase CLI to deploy functions to the Cloud Functions runtime.

```
npm install -g firebase-tools
```

- In many cases, new features and bug fixes are available only with the latest version of the Firebase CLI and the firebase-functions SDK. It's a good practice to frequently update both the Firebase CLI and the SDK with these commands inside the functions folder of your Firebase project.

```
cd project/functions
npm install firebase-functions@latest firebase-admin@latest --save
```

- Install the 'functions' dependencies along with the Local emulator (Firebase Tools v9.10.0 or higher, Node.js v12.13.0 or higher and Java version 1.8 or higher)
```
cd project/functions
npm install
```

- Important! After new functions are added or changed in our backend or setting this up for the first time. 
  You need to build the backend manually by running:

```
cd projekt/functions
npm run build
```
(this will compile with tsc, Typescript to Javascript)

- Add custom configs for our Firebase Cloud Functions. Handling 3rd party API secrets etc
(not needed right now)
```
tbd
```


- Start up the emulators in project root directory.
```
firebase emulators:start
```

The emulator will start our services:

```
Firebase Auth -> localhost:5001
Cloud Functions -> localhost:5002
Cloud Firestore (our database) -> localhost:8080
Emulator Suite UI default is http://localhost:4000
```

If having problems with emulators (firestore and UI) not shutting down.
A message like this:

```
 Emulator UI has exited upon receiving signal: SIGINT
```

or when you try to start your emulators:

```
Port 5003 is not open on localhost, could not start Pub/Sub Emulator.
```

We need to kill the process that hangs on the port:

On mac:
```
 lsof -i tcp:<port>
 kill -9 <pid>
```
On windows:

```
netstat -ano | findstr :<port>
taskkill /PID <pid> /F
```



- To play with Firestore (our db) goto Emulator UI at http://localhost:4000/firestore

- Tools (data importer)
```
cd projekt/tools
npm install
```

- Obtain a serviceAccount.json file if you dont ready have one, it should look something like this:
    The serviceAccount.json contains sensitive information and must therefore never be committed to vcs.
    Place the serviceAccount.json in the tools-folder.
    
    ```
    {
      "type": "service_account",
      "project_id": "",
      "private_key_id": "",
      "private_key": "",
      "client_email": "",
      "client_id": "",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url":
      "client_x509_cert_url":
    }
    ```


- To populate the database with some initial test-data run:

```
cd project/tools
node importData
```


## Learn More

Learn more about [Firebase & Cloud FireStore](https://firebase.google.com/docs/firestore).

Learn more about [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite).



 
