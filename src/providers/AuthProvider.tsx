import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { firebase } from "services/firebase";
import * as app from "firebase/app";

import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "store/slices/authSlice";
import { User } from "store/models";

export interface AuthContextValue {
    currentUser: app.default.User | null;
}

const AuthContext = createContext<AuthContextValue>({
    currentUser: null
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    dispatch(loginSuccess({ email: user.email, uid: user.uid } as User));
                } else {
                    dispatch(logout());
                }
            },
            (error) => console.log(error)
        );
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ currentUser: null }}>{props.children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
