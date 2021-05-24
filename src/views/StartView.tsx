import * as React from "react";
import styles from "styles/App.module.css";
import logo from "assets/uefa-euro-2020.png";
import { GroupList } from "components/GroupList";

export const StartView = (): JSX.Element => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <img alt="euro 2020" src={logo} style={{ width: "300px" }} />
                <GroupList />
            </header>
        </div>
    );
};
