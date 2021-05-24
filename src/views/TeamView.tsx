import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeamByCodeSelector } from "store/slices/teamsSlice";

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
                <h1>{team.name} ({team.code})</h1>
            </div>
        </>
    );
};
