import { useParams } from "react-router-dom";
import { GroupStandingsTable } from "components/GroupStandingsTable";
import { useSelector } from "react-redux";
import { getGroupByIDSelector } from "store/selectors";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { teamsStateSelector } from "store/slices/teamsSlice";
import { Helmet } from "react-helmet";
import { getGroupMatchesSelector } from "store/slices/matchesSlice";
import { MatchList } from "components/MatchList";

export const GroupView = (): JSX.Element => {
    const { groupId } = useParams<{ groupId: string }>();
    const groupState = useSelector(groupsStateSelector);
    const teamsState = useSelector(teamsStateSelector);
    const group = useSelector(getGroupByIDSelector(groupId));
    const roundMatches = useSelector(getGroupMatchesSelector(groupId));

    if (groupState.isLoading || teamsState.isLoading) return <div>Loading...</div>;

    if (!group) return <></>;

    return (
        <div>
            <Helmet>
                <title>Group {groupId} - Euro 2020 - Fotbollsfeber.se</title>
            </Helmet>
            <h2>Group {groupId}</h2>
            <p>Lorem ipsum info about the group</p>
            <h3>Standings</h3>
            <GroupStandingsTable group={group} />
            <h3>Matches</h3>
            <MatchList roundMatches={roundMatches} />
        </div>
    );
};
