export interface User {
    uid: string;
    email: string;
    displayName: string;
}

export interface Group {
    id: string;
    teamsIds: string[];
    teams: Team[];
}

export interface GroupDetailed {
    id: string;
    teams: (Team | undefined)[];
}

export interface Team {
    teamID: string; // id in statorium
    code: string; // 3 char code
    name: string;
    players?: Player[];
}

export interface PlayerAdditionalInfo {
    birthdate: string;
    height: string;
    weight: string;
    position: string;
}

export interface Player {
    playerID: string;
    firstName: string;
    lastName: string;
    shortName: string;
    fullName: string;
    homeName: string;
    photo: string;
    additionalInfo: PlayerAdditionalInfo;
    playerNumber: string;
}

export interface VenueShort {
    id: string;
    name: string;
    city: string;
}

export interface TeamShort {
    teamID: string;
    name: string;
    code: string;
}

export interface Match {
    id: string;
    group: string;
    matchDayRoundNr: number; // group stage round nr, todo handle quarterfinals etc
    matchDayPlayoff: string; //0=Group Stage, 1=Playoff
    matchdayName: string;
    matchDayType: string;
    matchStatus: string; //0=Upcoming 1=Played, -1=Livematch
    matchDate: string;
    matchTime: string;
    venue: VenueShort;
    homeTeam: TeamShort;
    awayTeam: TeamShort;
    homeScore: string;
    awayScore: string;
}

export interface Venue {
    id: string;
    name: string;
    city: string;
    capacity: string;
    opened: string;
    geolocation: { lng: string; lat: string };
    photo: string;
}
