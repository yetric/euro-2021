import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { Venue } from "store/models";

export const VENUES_COLLECTION = "venues";

interface VenuesState {
  venues: Venue[];
  hasError: boolean;
  error: string;
  isLoading: boolean;
}

const initialState = {
  venues: [],
  hasError: false,
  error: "",
  isLoading: true
} as VenuesState;

export const venuesSlice = createSlice({
  name: "venues",
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
    update: (state, action: PayloadAction<Venue[]>) => {
      state.venues = action.payload;
      state.isLoading = false;
      state.error = "";
      state.hasError = false;
    }
  }
});

/**
 * Load Venues Async
 */
export const loadVenuesAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updating());
    const querySnapshot = await firebase.firestore().collection(VENUES_COLLECTION).get();
    const venues = querySnapshot.docs.map((doc) => doc.data() as Venue);
    dispatch(update(venues));
  } catch (error) {
    dispatch(hasError(error.message.toString()));
  }
};

const { updating, hasError, update } = venuesSlice.actions;
export const venuesStateSelector = (state: RootState): VenuesState => state.venues;

export default venuesSlice.reducer;
