import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import groupsReducer from "store/slices/groupsSlice";
import teamsReducer from "store/slices/teamsSlice";
import matchesReducer from "store/slices/matchesSlice";
import venuesReducer from "store/slices/venuesSlice";
import authReducer from "store/slices/authSlice";
import leagueReducer from "store/slices/leagueSlice";
import betsReducer from "store/slices/betsSlice";

const combinedReducer = combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    venues: venuesReducer,
    league: leagueReducer,
    bets: betsReducer
});

const middlewares = [...getDefaultMiddleware()];

export const store = configureStore({
    reducer: combinedReducer,
    middleware: middlewares,
    devTools: process.env.REACT_APP_ENVIRONMENT === "localhost"
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, any, Action<string>>;
