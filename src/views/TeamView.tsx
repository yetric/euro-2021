import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector } from "store/slices/teamsSlice";
import { TeamPlayer } from "../components/TeamPlayer";
import { Player } from "../store/models";

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
                <h1>{team.name}</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quas quis vel
                    voluptate? Aspernatur ipsam placeat ratione. Assumenda culpa debitis doloremque,
                    eligendi ex facilis nisi, nobis quidem rem sapiente soluta!
                </p>
                <h2>Players</h2>
                {team.players?.map((player: Player) => (
                    <TeamPlayer key={player.playerID} player={player} />
                ))}
            </div>
        </>
    );
};
