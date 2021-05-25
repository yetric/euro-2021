import { useSelector } from "react-redux";
import { authStateSelector } from "store/slices/authSlice";

export const ProfileView = (): JSX.Element => {
    const authState = useSelector(authStateSelector);

    if (!authState.login.isLoggedIn) return <>login please</>;

    return (
        <div>
            ProfileView <pre>{JSON.stringify(authState.login.user)}</pre>
        </div>
    );
};
