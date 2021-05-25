import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Match } from "store/models";

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
            state.isLoading = false;
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

export default matchesSlice.reducer;
