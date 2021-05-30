import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { League, User } from "store/models";

export const LEAGUE_COLLECTION = "league";

interface LeagueState {
    league: League | null;
    hasError: boolean;
    error: string;
    isLoading: boolean;
}

const initialState = {
    league: null,
    hasError: false,
    error: "",
    isLoading: false,
} as LeagueState;

export const leagueSlice = createSlice({
    name: "league",
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
        update: (state, action: PayloadAction<League>) => {
            state.league = action.payload;
            state.isLoading = false;
            state.error = "";
            state.hasError = false;
        }
    }
});

/**
 * Load League
 */
export const loadLeagueById =
    (leagueId: string): AppThunk =>
    async (dispatch) => {
        dispatch(updating());
        try {
            const leagueRef = firebase.firestore().collection(LEAGUE_COLLECTION).doc(leagueId);
            const doc = await leagueRef.get();
            if (doc && doc.exists) {
                const league = {
                    id: doc.data()?.id,
                    name: doc.data()?.name,
                    maxCompetitors: doc.data()?.maxCompetitors,
                    owner: doc.data()?.owner as User,
                    createdAt: doc.data()?.createdAt.toMillis()
                } as League;
                dispatch(update(league));
            } else {
                dispatch(hasError("League not found"));
            }
        } catch (error) {
            dispatch(hasError(error.message.toString()));
        }
    };

const { updating, hasError, update } = leagueSlice.actions;
export const leagueStateSelector = (state: RootState): LeagueState => state.league;

export default leagueSlice.reducer;
