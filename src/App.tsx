import React from "react";
import styles from "./styles/App.module.css";
import { GroupList } from "components/GroupList";
import logo from "./assets/uefa-euro-2020.png";

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <img alt="euro 2020" src={logo} style={{width: "300px"}}/>
                <GroupList />
            </header>
        </div>
    );
}

export default App;
