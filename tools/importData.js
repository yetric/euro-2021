const statorium = require("./statorium-client");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

// Start Environment
const environment = process.argv[2] ? process.argv[2] : "localhost";
if (environment !== "live" && environment !== "localhost") {
    console.log("\x1b[31m", 'Invalid environment. Valid environments are "localhost" or "live"');
    process.exit(-1);
}
if (environment === "localhost") {
    dotenv.config(); // setup to use .env file with localhost emulator settings
    console.log("\x1b[32m", "Importing fixtures in emulators running on:");
    console.log("\x1b[33m%s\x1b[0m", " - Firestore: " + process.env.FIRESTORE_EMULATOR_HOST);
    console.log("\x1b[33m%s\x1b[0m", " - Auth: " + process.env.FIREBASE_AUTH_EMULATOR_HOST);
}

if (environment === "live") {
    console.log("\x1b[32m", "WARNING", "Using live settings!");
}
// End environment

// Init firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const getEuroData = async () => {
    const response = await statorium.getStandingsBySeasonId(40);
    const groups = response.data.season.groups.map((group) => {
        const teamIds = group.standings.map((standings) => standings.teamID);
        const teams = [];
        return { id: group.groupName.replace("Group ", ""), teamIds: teamIds };
    });

    const fetchTeam = async (id) => {
        const r = await statorium.getTeamById(id);
        return {
            teamID: r.data.team.teamID,
            name: r.data.team.teamName,
            code: r.data.team.shortName
        };
    };

    const allTeamPromises = groups.flatMap((g) => g.teamIds.map((t) => fetchTeam(t)));

    const teams = await Promise.all(allTeamPromises);

    return { groups, teams };
};

getEuroData().then((data) => {
    const db = admin.firestore();
    const batch = db.batch();

    // Group data
    const groupCollection = db.collection("groups");
    data.groups.map((group) => {
        let newDoc = groupCollection.doc(group.id);
        batch.set(newDoc, group);
        return true;
    });

    // Team data
    const teamCollection = db.collection("teams");
    data.teams.map((team) => {
        let newDoc = teamCollection.doc(team.code);
        batch.set(newDoc, team);
        return true;
    });

    batch
        .commit()
        .then(() => {
            console.log("\x1b[32m", "Import of data successful!");
            console.log("\x1b[0m");
        })
        .catch((e) => console.log("failed inserting data :/"));
});
