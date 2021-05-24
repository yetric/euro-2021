export interface Group {
    id: string;
    teamsIds: string[];
}

export interface GroupDetailed {
    id: string;
    teams: (Team | undefined)[];
}

export interface Team {
    teamID: string; // id in statorium
    code: string; // 3 char code
    name: string;
}
