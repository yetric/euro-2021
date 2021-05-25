import { LoginForm } from "components/LoginForm";
import { useSelector } from "react-redux";
import { authStateSelector } from "store/slices/authSlice";
import { LogoutButton } from "components/LogoutButton";
import { Link } from "react-router-dom";

export const LoginView = (): JSX.Element => {
    const authState = useSelector(authStateSelector);
    return (
        <div>
            <h2>Login</h2>
            {authState.login.isLoggedIn ? <LogoutButton /> : <LoginForm />}
            or <Link to={"/signup"}>Register</Link>
        </div>
    );
};
