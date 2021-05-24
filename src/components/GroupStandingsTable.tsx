import { Table } from "react-bootstrap";
import { GroupDetailed } from "store/models";

interface GroupStandingsTableProps {
    group: GroupDetailed;
}

const cols = ["Team", "Played", "Won", "Drawn", "Lost", "For", "Against", "Goal diff", "Points"];

export const GroupStandingsTable = (props: GroupStandingsTableProps): JSX.Element => {
    return (
        <Table>
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
                        <td>{team?.name ?? "n/a"}</td>
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
