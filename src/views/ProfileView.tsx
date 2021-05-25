import { useSelector } from "react-redux";
import { authStateSelector } from "store/slices/authSlice";

export const ProfileView = (): JSX.Element => {
    const authState = useSelector(authStateSelector);

    return <div>ProfileView User with id {authState.login.user?.uid}</div>;
}
