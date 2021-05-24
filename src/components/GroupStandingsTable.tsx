import { Table } from "react-bootstrap";

interface GroupStandingsTableProps {
    teams: string[];
}

const cols = ["Team", "Played", "Won", "Drawn", "Lost", "For", "Against", "Goal diff", "Points"];

export const GroupStandingsTable = (props: GroupStandingsTableProps): JSX.Element => {
    return (
        <Table>
            <thead>
                <tr>
                    {cols.map((col) => (
                        <th>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.teams.map((team, index) => (
                    <tr key={index}>
                        <td>{team}</td>
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
