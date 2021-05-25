import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebase } from "services/firebase";
import { AppThunk, RootState } from "store/index";

export interface RegisterState {
    isRegistering: boolean;
    isRegistered: boolean;
    hasError: boolean;
    error?: string;
}

export interface AuthState {
    register: RegisterState;
}

const initialState = {
    register: {
        isRegistering: false,
        isRegistered: false,
        hasError: false,
        error: ""
    } as RegisterState
} as AuthState;

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        registerStart: (state) => {
            state.register.isRegistering = true;
            state.register.hasError = false;
            state.register.error = "";
        },
        registerSuccess: (state) => {
            state.register.isRegistering = false;
            state.register.isRegistered = true;
        },
        registerError: (state, action: PayloadAction<string>) => {
            state.register.isRegistering = false;
            state.register.isRegistered = false;
            state.register.hasError = true;
            state.register.error = `${action.payload}`;
        }
    }
});

const { registerSuccess, registerStart, registerError } = authSlice.actions;

/**
 * Create User With Email And Password
 * @param email
 * @param password
 */
export const createUserWithEmailAndPassword =
    (email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(registerStart());
            const userCredential = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(userCredential);
            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerError(error.message));
            console.log(error);
        }
    };

export const authStateSelector = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
