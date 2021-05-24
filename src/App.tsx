import React from 'react';
import styles from './styles/App.module.css';
import {useLoadGroups} from "store/hooks/useLoadGroups";

function App() {
  useLoadGroups();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>EURO 2021</h1>
        <div>
          todo list groups here
        </div>
      </header>
    </div>
  );
}

export default App;
