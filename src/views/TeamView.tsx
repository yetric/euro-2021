import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector, getTeamPlayersSelector } from "store/slices/teamsSlice";
import { TeamPlayer } from "components/TeamPlayer";
import { Player } from "store/models";
import { TeamIcon } from "components/TeamIcon";
import { getTeamMatchesSelector } from "store/slices/matchesSlice";
import { MatchList } from "components/MatchList";
import { TeamStats } from "../components/TeamStats";

export const TeamView = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const team = useSelector(getTeamByCodeSelector(teamId));
    const teamRoundMatches = useSelector(getTeamMatchesSelector(teamId));
    const teamPlayers = useSelector(getTeamPlayersSelector(teamId));

    if (!team || !teamRoundMatches) return <></>;

    return (
        <>
            <Helmet>
                <title>{team.name}</title>
            </Helmet>
            <div>
                <h1>
                    <TeamIcon team={team.code} size={"medium"} /> {team.name}
                </h1>

                <TeamStats team={teamPlayers} />

                <h2>Matches</h2>
                <MatchList roundMatches={teamRoundMatches} />

                <h2>Players</h2>
                {teamPlayers?.map((player: Player) => (
                    <TeamPlayer teamCode={team.code} key={player.playerID} player={player} />
                ))}
            </div>
        </>
    );
};
