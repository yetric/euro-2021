import styles from "styles/App.module.css";
import logo from "assets/uefa-euro-2020.png";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <Link to={`/`}>
                <img alt="euro 2020" src={logo} style={{ width: "300px" }} />
            </Link>
        </header>
    );
};
