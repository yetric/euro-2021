import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Team } from "store/models";
import { createSelector } from "reselect";
import * as _ from "lodash";

export const TEAMS_COLLECTION = "teams";

interface TeamsState {
    teams: Team[];
    hasError: boolean;
    error: string;
    isLoading: boolean;
}

const initialState = {
    teams: [],
    hasError: false,
    error: "",
    isLoading: true
} as TeamsState;

export const teamsSlice = createSlice({
    name: "teams",
    initialState: initialState,
    reducers: {
        updating: (state) => {
            state.isLoading = true;
            state.error = "";
            state.isLoading = false;
        },
        hasError: (state, action: PayloadAction<string>) => {
            state.hasError = true;
            state.error = `An error occurred: (${action.payload}) `;
            state.isLoading = false;
        },
        update: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload;
            state.isLoading = false;
            state.error = "";
            state.hasError = false;
        }
    }
});

/**
 * Load All Teams Async
 */
export const loadTeamsAsync = (): AppThunk => async (dispatch) => {
    try {
        dispatch(updating());
        const querySnapshot = await firebase.firestore().collection(TEAMS_COLLECTION).get();

        const teams = querySnapshot.docs.map(
            (doc) =>
                ({
                    teamID: doc.data().teamID,
                    code: doc.data().code,
                    name: doc.data().name,
                    players: doc.data().players
                } as Team)
        );

        dispatch(update(teams));
    } catch (error) {
        dispatch(hasError(error.message.toString()));
    }
};

const { updating, hasError, update } = teamsSlice.actions;
export const teamsStateSelector = (state: RootState): TeamsState => state.teams;

export const getTeamByCodeSelector = (code: string) =>
    createSelector([teamsStateSelector], (teamsState) => {
        return teamsState.teams.find((team) => code === team.code);
    });

/**
 * Get Team Players sorted by Pos by a given team code
 * @param code
 */
export const getTeamPlayersSelector = (code: string) =>
    createSelector([getTeamByCodeSelector(code)], (team) => {
        const sortedPlayers = _.orderBy(
            team?.players,
            ["additionalInfo.position", "lastName"],
            ["asc", "asc"]
        );
        return sortedPlayers;
    });

export default teamsSlice.reducer;
