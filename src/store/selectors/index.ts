import { createSelector } from "reselect";
import { groupsStateSelector } from "store/slices/groupsSlice";
import * as _ from "lodash";
import { Match } from "store/models";
import { matchStateSelector } from "store/slices/matchesSlice";
import { betsStateSelector } from "store/slices/betsSlice";

export interface BetGame {
    game: Match;
    home: number;
    away: number;
}

export const getGroupByIDSelector = (id: string) =>
    createSelector([groupsStateSelector], (groupsState) => {
        return groupsState.groups.find((group) => id === group.id);
    });

export const getLeagueGameBets = () =>
    createSelector([matchStateSelector, betsStateSelector], (matchesState, betsState) => {
        let matches = _.orderBy(
            matchesState.matches,
            ["matchDayRoundNr", "matchDate"],
            ["asc", "asc"]
        );
        const lookup = betsState.bets;
        let bets: any = {};
        matches.forEach((match: Match) => {
            if (lookup && lookup.hasOwnProperty(match.id)) {
                bets[match.id] = [lookup[match.id][0], lookup[match.id][1]];
            } else {
                bets[match.id] = [0, 0];
            }
        });
        return matches.map((match) => {
            let home,
                away = 0;
            if (lookup && lookup.hasOwnProperty(match.id)) {
                home = lookup[match.id][0];
                away = lookup[match.id][1];
            }
            return { game: match, home, away } as BetGame;
        });
    });
