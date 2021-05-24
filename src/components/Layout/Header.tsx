import styles from "styles/App.module.css";
import logo from "assets/uefa-euro-2020.png";

export const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <img alt="euro 2020" src={logo} style={{ width: "300px" }} />
        </header>
    );
};
