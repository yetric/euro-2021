import React from 'react';
import styles from './styles/App.module.css';
import {useLoadGroups} from "store/hooks/useLoadGroups";
import {useSelector} from "react-redux";
import {groupsStateSelector} from "store/slices/groupsSlice";

function App() {
  useLoadGroups();
  const groupState = useSelector(groupsStateSelector)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>EURO 2021</h1>
        <div>
          todo list groups here
          {JSON.stringify(groupState.groups)}
        </div>
      </header>
    </div>
  );
}

export default App;
