import React from "react";
import styles from "./styles/App.module.css";
import { GroupList } from "components/GroupList";
import logo from "./assets/uefa-euro-2020.png";

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <img src={logo} style={{width: "300px"}}/>
                <h1>EURO 2021</h1>
                <GroupList />
            </header>
        </div>
    );
}

export default App;
