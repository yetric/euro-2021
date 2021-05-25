import { SignupForm } from "components/SignupForm";
import { useSelector } from "react-redux";
import { authStateSelector } from "store/slices/authSlice";
import { Link } from "react-router-dom";

export const SignupView = (): JSX.Element => {
    const authState = useSelector(authStateSelector);
    return (
        <div>
            <h2>Signup</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et felis sodales,
                bibendum sapien ac, facilisis purus. Nunc iaculis nisi ac lorem convallis accumsan.
                Cras dictum, nisl in vestibulum suscipit, enim sapien vulputate augue
            </p>
            {!authState.login.isLoggedIn ? (
                <div>
                    <SignupForm />
                    or <Link to={"/login"}>Login</Link>
                </div>
            ) : ("Du har redan ett konto")}
        </div>
    );
};
