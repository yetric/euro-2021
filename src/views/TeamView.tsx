import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector } from "store/slices/teamsSlice";
import { TeamPlayer } from "../components/TeamPlayer";
import { Player } from "../store/models";
import { Card, CardGroup } from "react-bootstrap";
import { TeamIcon } from "../components/TeamIcon";

export const TeamView = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const team = useSelector(getTeamByCodeSelector(teamId));

    if (!team) return <></>;

    return (
        <>
            <Helmet>
                <title>{team.name}</title>
            </Helmet>
            <div>
                <h1>
                    <TeamIcon team={team.code} /> {team.name}
                </h1>

                <CardGroup className={"mb-3"}>
                    <Card>
                        <Card.Header>Average Player</Card.Header>
                        <Card.Body>Calculate avg player</Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Squad Data</Card.Header>
                        <Card.Body>Show distribution of Age, Weight, Length, BMI</Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>About the Team</Card.Header>
                        <Card.Body>Some fun fact about the team</Card.Body>
                    </Card>
                </CardGroup>

                <h2>Players</h2>
                {team.players?.map((player: Player) => (
                    <TeamPlayer teamCode={team.code} key={player.playerID} player={player} />
                ))}
            </div>
        </>
    );
};
