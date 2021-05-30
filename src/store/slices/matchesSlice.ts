import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Match } from "store/models";
import * as _ from "lodash";
import { createSelector } from "reselect";

export const MATCHES_COLLECTION = "matches";

interface MatchesState {
    matches: Match[];
    hasError: boolean;
    error: string;
    isLoading: boolean;
}

const initialState = {
    matches: [],
    hasError: false,
    error: "",
    isLoading: true
} as MatchesState;

export const matchesSlice = createSlice({
    name: "matches",
    initialState: initialState,
    reducers: {
        updating: (state) => {
            state.isLoading = true;
            state.error = "";
            state.hasError = false;
        },
        hasError: (state, action: PayloadAction<string>) => {
            state.hasError = true;
            state.error = `An error occurred: (${action.payload}) `;
            state.isLoading = false;
        },
        update: (state, action: PayloadAction<Match[]>) => {
            state.matches = action.payload;
            state.isLoading = false;
            state.error = "";
            state.hasError = false;
        }
    }
});

/**
 * Load Matches Async
 */
export const loadMatchesAsync = (): AppThunk => async (dispatch) => {
    try {
        dispatch(updating());
        const querySnapshot = await firebase.firestore().collection(MATCHES_COLLECTION).get();
        const matches = querySnapshot.docs.map((doc) => doc.data() as Match);
        dispatch(update(matches));
    } catch (error) {
        dispatch(hasError(error.message.toString()));
    }
};

const { updating, hasError, update } = matchesSlice.actions;
export const matchStateSelector = (state: RootState): MatchesState => state.matches;

export const getGroupMatchesSelector = (groupId: string) =>
    createSelector([matchStateSelector], (matchesState) => {
        const filtered = matchesState.matches.filter((match) => match.group === groupId);
        const sorted = _.orderBy(filtered, ["matchDayRoundNr", "matchDate"], ["asc", "asc"]);
        const roundGames = _.chain(sorted)
            .groupBy("matchdayName")
            .map((value, key) => ({ roundName: key, matches: value }))
            .value();
        return roundGames;
    });

export const getTeamMatchesSelector = (code: string) =>
    createSelector([matchStateSelector], (matchesState) => {
        const filtered = matchesState.matches.filter(
            (match) => match.homeTeam.code === code || match.awayTeam.code === code
        );
        const sorted = _.orderBy(filtered, ["matchDayRoundNr", "matchDate"], ["asc", "asc"]);
        const roundGames = _.chain(sorted)
            .groupBy("matchdayName")
            .map((value, key) => ({ roundName: key, matches: value }))
            .value();
        return roundGames;
    });

export const getAllMatches = () =>
    createSelector([matchStateSelector], (matchesState) => {
        return _.orderBy(matchesState.matches, ["matchDayRoundNr", "matchDate"], ["asc", "asc"]);
    });

export const getUserBets = () =>
    createSelector([matchStateSelector], (matchesState) => {
        let matches = _.orderBy(
            matchesState.matches,
            ["matchDayRoundNr", "matchDate"],
            ["asc", "asc"]
        );
        // TODO - get this from backend with userId?
        let bets: any = {};
        matches.forEach((match: Match) => {
            bets[match.id] = [0, 0];
        });
        return bets;
    });
export default matchesSlice.reducer;
