import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Team } from "store/models";
import { createSelector } from "reselect";
import { groupsStateSelector } from "store/slices/groupsSlice";

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
                    name: doc.data().name
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


export default teamsSlice.reducer;
