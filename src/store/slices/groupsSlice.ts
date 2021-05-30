import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Group } from "store/models";

export const GROUPS_COLLECTION = "groups";

interface GroupsState {
    groups: Group[];
    hasError: boolean;
    error: string;
    isLoading: boolean;
}

const initialState = {
    groups: [],
    hasError: false,
    error: "",
    isLoading: true
} as GroupsState;

export const groupsSlice = createSlice({
    name: "groups",
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
        update: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
            state.isLoading = false;
            state.error = "";
            state.hasError = false;
        }
    }
});

/**
 * Load Groups Async
 */
export const loadGroupsAsync = (): AppThunk => async (dispatch) => {
    try {
        dispatch(updating());
        const querySnapshot = await firebase.firestore().collection(GROUPS_COLLECTION).get();

        const groups = querySnapshot.docs.map((doc) => ({
            id: doc.data().id,
            teamsIds: doc.data().teamIds,
            teams: doc.data().teams
        }));

        dispatch(update(groups));
    } catch (error) {
        dispatch(hasError(error.message.toString()));
    }
};

const { updating, hasError, update } = groupsSlice.actions;
export const groupsStateSelector = (state: RootState): GroupsState => state.groups;

export default groupsSlice.reducer;
