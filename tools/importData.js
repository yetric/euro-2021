const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');


// fixture data
const groupsData = require('./data/groups.json');

// Start Environment
const environment = process.argv[2] ? process.argv[2] : 'localhost';
if (environment !== 'live' && environment !== 'localhost') {
    console.log(
        '\x1b[31m',
        'Invalid environment. Valid environments are "localhost" or "live"'
    );
    process.exit(-1);
}
if (environment === 'localhost') {
    dotenv.config(); // setup to use .env file with localhost emulator settings
    console.log('\x1b[32m', 'Importing fixtures in emulators running on:');
    console.log(
        '\x1b[33m%s\x1b[0m',
        ' - Firestore: ' + process.env.FIRESTORE_EMULATOR_HOST
    );
    console.log(
        '\x1b[33m%s\x1b[0m',
        ' - Auth: ' + process.env.FIREBASE_AUTH_EMULATOR_HOST
    );
}

if (environment === 'live') {
    console.log('\x1b[32m', 'WARNING', 'Using live settings!');
}
// End environment


// Init firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

// Groups
const groupCollection = db.collection('groups');
groupsData.groups.map((group) => {
    let newDoc = groupCollection.doc(group.id);
    batch.set(newDoc, group);
    return true;
});
// End Groups

batch.commit().then(() => {
    console.log('\x1b[32m', 'Import of group data was successful!');
    process.exit(0);
}).catch((e) => console.log("failed inserting group data :/"))


