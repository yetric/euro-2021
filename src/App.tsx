import React from "react";
import styles from "./styles/App.module.css";
import {GroupList} from "components/GroupList";

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>EURO 2021</h1>
                <GroupList />
            </header>
        </div>
    );
}

export default App;
