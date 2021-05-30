require("dotenv").config();
const faker = require("faker");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
console.log("Auth emulator: " + process.env.FIREBASE_AUTH_EMULATOR_HOST);
console.log("Firestore emulator: " + process.env.FIRESTORE_EMULATOR_HOST);

const nrOfUsers = process.argv[2];

if (nrOfUsers === undefined) {
    console.log("Enter a parameter with how many Users....ex: node createFakerUser.js 20");
    process.exit(-1);
}

const authLocalhost = process.env.FIREBASE_AUTH_EMULATOR_HOST.indexOf("localhost");
const firestoreLocalhost = process.env.FIRESTORE_EMULATOR_HOST.indexOf("localhost");

if (authLocalhost !== 0 || firestoreLocalhost !== 0) {
    console.log("Sorry! This script is intended for localhost emulators only.");
    process.exit(-1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIRESTORE_EMULATOR_HOST
});

addLeague = (league) => {
    return admin
        .firestore()
        .collection("league")
        .doc()
        .set({
            ...league,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
};

const generateUsersLeaguesEtc = async () => {
    let promises = [];
    for (let i = 0; i < nrOfUsers; i++) {
        const genders = ["female", "male"];
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const firstname = faker.name.firstName(gender);
        const lastname = faker.name.lastName(gender);

        const user = {
            email: faker.internet.email(),
            emailVerified: true,
            password: "Tester1234!",
            displayName: firstname + " " + lastname,
            disabled: false
        };
        promises.push(admin.auth().createUser(user));
    }
    const userRecords = await Promise.all(promises);

    const userIds = userRecords.map((user) => user.uid);
    console.log(userIds);

    // create user league
    const owner = userRecords[Math.floor(Math.random() * userRecords.length)];
    const leagueName =
        faker.address.cardinalDirection(false) +
        " " +
        faker.address.cityName() +
        " " +
        faker.commerce.color();
    const league = {
        name: leagueName,
        owner: {
            uid: owner.uid,
            email: owner.email,
            displayName: owner.displayName
        },
        maxCompetitors: 10,
    };

    let leaguePromises = [];
    leaguePromises.push(addLeague(league));

    const leagues = await Promise.all(leaguePromises);

};

generateUsersLeaguesEtc().then((r) => {
    console.log("done");
    process.exit(1);
});
