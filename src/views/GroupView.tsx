import { useParams } from "react-router-dom";
import styles from "styles/App.module.css";
import * as React from "react";

export const GroupView = (): JSX.Element => {
    const { groupId } = useParams<{ groupId: string }>();
    return (
        <div className={styles.app}>
            <div className={styles.header}>Group {groupId}</div>
        </div>
    );
};
