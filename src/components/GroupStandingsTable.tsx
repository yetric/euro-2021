import { Table } from "react-bootstrap";
import { GroupDetailed } from "store/models";
import styles from "./styles/GroupStandingsTable.module.css";
import { TeamIcon } from "./TeamIcon";
import { Link } from "react-router-dom";

interface GroupStandingsTableProps {
    group: GroupDetailed;

}

const cols = ["Team", "Played", "Won", "Drawn", "Lost", "For", "Against", "Goal diff", "Points"];

export const GroupStandingsTable = (props: GroupStandingsTableProps): JSX.Element => {
    return (
        <Table className={styles.table}>
            <thead>
                <tr>
                    {cols.map((col, index) => (
                        <th key={"col-" + index}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.group.teams.map((team, index) => (
                    <tr key={index}>
                        <td>
                            {team && (
                                <>
                                    <TeamIcon team={team.code} />{" "}
                                    <Link to={"/team/" + team.code}>{team.name}</Link>
                                </>
                            )}
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
