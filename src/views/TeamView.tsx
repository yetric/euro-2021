import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector } from "store/slices/teamsSlice";
import { TeamIcon } from "components/TeamIcon";

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
                    {team.name} ({team.code})
                </h1>
                <TeamIcon team={team.code} size={"large"} />
                <p>(Pos: 1 = målvakt, 2 = back, 3 = mittf, 4 = anfall)</p>
                <ul>
                    {team.players?.map((player) => (
                        <li key={player.playerID}>
                            <img
                                src={player.photo}
                                alt={player.shortName}
                                style={{ width: "100px" }}
                            />
                            Pos: {player.additionalInfo.position} {player.fullName}{" "}
                            {player.additionalInfo.height} {player.additionalInfo.weight}{" "}
                            {player.additionalInfo.birthdate}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
