import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebase } from "services/firebase";
import { AppThunk, RootState } from "store/index";
import { User } from "store/models";

export interface RegisterState {
    isRegistering: boolean;
    isRegistered: boolean;
    hasError: boolean;
    error?: string;
}

export interface LoginState {
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    user: User | null;
    hasError: boolean;
    error?: string;
}

export interface AuthState {
    register: RegisterState;
    login: LoginState;
}

const initialState = {
    register: {
        isRegistering: false,
        isRegistered: false,
        hasError: false,
        error: ""
    } as RegisterState,
    login: {
        isLoggingIn: false,
        isLoggedIn: false,
        hasError: false,
        user: null,
        error: ""
    } as LoginState
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
        },
        loginStart: (state) => {
            state.login.isLoggingIn = true;
            state.login.hasError = false;
            state.login.error = "";
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.login.isLoggingIn = false;
            state.login.isLoggedIn = true;
            state.login.user = action.payload;
        },
        loginError: (state, action: PayloadAction<string>) => {
            state.login.isLoggingIn = false;
            state.login.isLoggedIn = false;
            state.login.hasError = true;
            state.login.error = `${action.payload}`;
        },
        logout: (state) => {
            state.login.isLoggingIn = false;
            state.login.isLoggedIn = false;
            state.login.user = null;
        }
    }
});

export const {
    registerSuccess,
    registerStart,
    registerError,
    loginStart,
    loginSuccess,
    loginError,
    logout
} = authSlice.actions;

/**
 * Login async
 * @param email
 * @param password
 */
export const loginAsync =
    (email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(loginStart());
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.code + " " + error.message); // todo better toasting msg system
            dispatch(loginError(error.message));
        }
    };

/**
 * Logout async
 */
export const logoutAsync = (): AppThunk => async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * Create User Account - DisplayName, Email And Password
 * @param displayName
 * @param email
 * @param password
 */
export const createUserAccount =
    (displayName: string, email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(registerStart());
            const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await userCred.user?.updateProfile({
                displayName: displayName
            });
            dispatch(registerSuccess());
            // auto login user
            dispatch(loginAsync(email, password));
        } catch (error) {
            dispatch(registerError(error.message));
            console.log(error);
        }
    };

export const authStateSelector = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
