import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector, getTeamPlayersSelector } from "store/slices/teamsSlice";
import { getTeamMatchesSelector } from "store/slices/matchesSlice";
import { TeamPlayer } from "components/TeamPlayer";
import { Player } from "store/models";
import { TeamIcon } from "components/TeamIcon";
import { MatchList } from "components/MatchList";
import { TeamStats } from "../components/TeamStats";
import { Col, Row } from "react-bootstrap";

export const TeamView = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const team = useSelector(getTeamByCodeSelector(teamId));
    const teamRoundMatches = useSelector(getTeamMatchesSelector(teamId));
    const teamPlayers = useSelector(getTeamPlayersSelector(teamId));

    if (!team || !teamRoundMatches) return <></>;

    return (
        <>
            <Helmet>
                <title>{team.name} - Euro 2020 (2021) - Fotbollsfeber.se</title>
            </Helmet>
            <Row>
                <Col lg={9}>
                    <h1>
                        <TeamIcon team={team.code} size={"medium"} /> {team.name}
                    </h1>

                    <h2>Matches</h2>
                    <MatchList roundMatches={teamRoundMatches} />

                    <h2>Players</h2>
                    {teamPlayers?.map((player: Player) => (
                        <TeamPlayer teamCode={team.code} key={player.playerID} player={player} />
                    ))}
                </Col>
                <Col lg={3}>
                    <TeamStats team={teamPlayers} />
                </Col>
            </Row>
        </>
    );
};
