const statorium = require("./statorium-client");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

const venues = require('./data/venues.json');

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
        return { id: group.groupName.replace("Group ", ""), teamIds: teamIds };
    });

    // matches
    const matchesResponse = await statorium.getMatches();
    const matches = matchesResponse.data.calendar.matchdays.flatMap((matchday, index) => {
        return matchday.matches.map((match) => {
            return {
                id: match.matchID,
                matchDayRoundNr: index + 1,
                matchdayName: matchday.matchdayName,
                matchDayType: matchday.matchdayType,
                matchDayPlayoff: matchday.matchdayPlayoff, //0	Ordinary, 1 = Playoff
                matchStatus: match.matchStatus.statusID, // 0 = upcoming 1=played, -1 Livematch
                matchDate: match.matchDate,
                matchTime: match.matchTime,
                venue: match.matchVenue.venueID,
                homeTeam: match.homeParticipant.participantID,
                awayTeam: match.awayParticipant.participantID,
                homeScore: match.homeParticipant.score,
                awayScore: match.awayParticipant.score
            };
        });
    });
    // const venueIDs = matches.map((m) => m.venue);
    // const venuesUniqueIds = [...new Set(venueIDs)];

    const fetchTeam = async (id) => {
        const r = await statorium.getTeamById(id);
        return {
            teamID: r.data.team.teamID,
            name: r.data.team.teamName,
            code: r.data.team.shortName,
            players: r.data.team.players
        };
    };

    const allTeamPromises = groups.flatMap((g) => g.teamIds.map((t) => fetchTeam(t)));
    const teams = await Promise.all(allTeamPromises);

    return { groups, teams, matches };
};

getEuroData().then((data) => {
    const db = admin.firestore();
    const batch = db.batch();

    // build Team lookup for small team ref
    const teamLookup = Object.assign(
        {},
        ...data.teams.map((s) => ({ [s.teamID]: { teamID: s.teamID, name: s.name, code: s.code } }))
    );

    // build Match team to groupID lookup   '385': 'C',
    const matchGroupLookup = Object.assign(
      {},
      ...data.groups.flatMap((group) => group.teamIds.map((id) => ({ [id]: group.id })))
    );

    // build venue lookup
    const venueLookup = Object.assign(
      {},
      ...venues.map((v) => ({ [v.id]: { id: v.id, name: v.name, city: v.city, country: v.country } }))
    );


    // Group data
    const groupCollection = db.collection("groups");
    data.groups.map((group) => {
        const grp = {
            id: group.id,
            teamsIds: group.teamIds,
            teams: group.teamIds.map((id) => teamLookup[id])
        };
        let newDoc = groupCollection.doc(group.id);
        batch.set(newDoc, grp);
        return true;
    });

    // Venues data
    const venuesCollection = db.collection("venues");
    venues.map((venue) => {
        let newDoc = venuesCollection.doc(venue.id);
        batch.set(newDoc, venue);
        return true;
    });

    // Team data
    const teamCollection = db.collection("teams");
    data.teams.map((team) => {
        let newDoc = teamCollection.doc(team.code);
        batch.set(newDoc, team);
        return true;
    });

    // Matches data
    const matchesCollection = db.collection("matches");
    data.matches.map((match) => {
        const m = {
            ...match,
            homeTeam: teamLookup[match.homeTeam],
            awayTeam: teamLookup[match.awayTeam],
            venue: venueLookup[match.venue],
            group: matchGroupLookup[match.homeTeam] // todo handle playoff
        };
        let newDoc = matchesCollection.doc(match.id); // todo slugify match
        batch.set(newDoc, m);
        return true;
    });

    console.log("Current insert batch count" + batch._opCount);

    batch
        .commit()
        .then(() => {
            console.log("\x1b[32m", "Import of data successful!");
            console.log("\x1b[0m");
        })
        .catch((e) => console.log("failed inserting data :/"));
});
