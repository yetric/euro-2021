import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/index";
// import { firebase } from "services/firebase";
// import { League, User } from "store/models";

// league/leagueId/bets/uid
export const BETS_COLLECTION = "league";

interface BettingMatch {
  [gameId: string]: [home: number, away: number]
}

interface BetsState {
  bets: BettingMatch | null;
  hasError: boolean;
  error: string;
  isLoading: boolean;
}

const initialState = {
  bets: {},
  hasError: false,
  error: "",
  isLoading: false,
} as BetsState;

export const betsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {
    hasError: (state, action: PayloadAction<string>) => {
      state.hasError = true;
      state.error = `An error occurred: (${action.payload}) `;
      state.isLoading = false;
    },
    updateBet: (state, action: PayloadAction<BettingMatch>) => {
      state.bets = action.payload;
      state.isLoading = false;
      state.error = "";
      state.hasError = false;
    }
  }
});

export const { updateBet } = betsSlice.actions;
const { hasError } = betsSlice.actions;
export const betsStateSelector = (state: RootState): BetsState => state.bets;

export default betsSlice.reducer;
