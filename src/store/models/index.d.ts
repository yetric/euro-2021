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
    height : string;
    weight : string;
    position : string;
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
    playerNumber : string;
}
