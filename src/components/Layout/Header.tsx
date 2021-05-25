import styles from "styles/App.module.css";
import logo from "assets/uefa-euro-2020.png";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/all";
import { useSelector } from "react-redux";
import { authStateSelector } from "store/slices/authSlice";
import { LogoutButton } from "components/LogoutButton";

export const Header = (): JSX.Element => {
    const authState = useSelector(authStateSelector);
    return (
        <header className={styles.header}>
            <Link to={`/`}>
                <img alt="euro 2020" src={logo} style={{ width: "80px" }} />
            </Link>
            <div className={styles.icons}>
                {authState.login.isLoggedIn ? (
                    <>
                        <Link to={"/you"}>
                            <IoPersonCircle />{" "}
                            {authState.login.user?.displayName
                                ? authState.login.user?.displayName
                                : authState.login.user?.email}
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <Link to={"/login"}>
                        <IoPersonCircle />
                        Logga in
                    </Link>
                )}
            </div>
        </header>
    );
};
