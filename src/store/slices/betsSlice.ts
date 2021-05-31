import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store/index";
import { firebase } from "services/firebase";
import { LEAGUE_COLLECTION } from "store/slices/leagueSlice";
import { BettingProps } from "views/TipsView";

// league/leagueId/bets/uid
export const BETS_COLLECTION = "bets";

export interface BettingMatches {
    [gameId: string]: [home: number, away: number];
}

interface BetsState {
    bets: BettingMatches; // null
    hasError: boolean;
    error: string;
    isLoading: boolean;
}

const initialState = {
    bets: {},
    hasError: false,
    error: "",
    isLoading: false
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
        startLoadingBet: (state) => {
            state.isLoading = true;
        },
        updateBet: (state, action: PayloadAction<BettingMatches>) => {
            state.bets = action.payload;
            state.isLoading = false;
            state.error = "";
            state.hasError = false;
        },
        updateBetMatch: (state, action: PayloadAction<BettingProps>) => {
            const { gameId, home, away } = action.payload;
            state.bets = { ...state.bets, ...{ [gameId]: [home, away] }};
        }
    }
});

export const loadLeagueBetByUserIdAsync =
    (leagueId: string, userId: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(startLoadingBet())
            const leagueUserBetRef = firebase
                .firestore()
                .collection(LEAGUE_COLLECTION)
                .doc(leagueId)
                .collection(BETS_COLLECTION)
                .doc(userId);
            const doc = await leagueUserBetRef.get();
            if (doc && doc.exists) {
                dispatch(updateBet(doc.data() as BettingMatches));
            } else {
                dispatch(hasError("Bets not found"));
            }
        } catch (error) {
            dispatch(hasError(error.message.toString()));
        }
    };

/**
 * Creates a new League Bet
 * @param leagueId
 * @param userId
 * @return id
 */
export const createLeagueBetAsync =
    (leagueId: string, userId: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            const bets = getState().bets.bets;
            if (bets) {
                const docRef = firebase
                    .firestore()
                    .collection(LEAGUE_COLLECTION)
                    .doc(leagueId)
                    .collection(BETS_COLLECTION)
                    .doc(userId);

                await docRef.set(bets);
                return docRef.id;
            } else {
                console.log("No betting data to persist");
            }
        } catch (error) {
            console.log(error);
        }
    };

export const { updateBet, updateBetMatch } = betsSlice.actions;
const { hasError, startLoadingBet } = betsSlice.actions;
export const betsStateSelector = (state: RootState): BetsState => state.bets;

export default betsSlice.reducer;
