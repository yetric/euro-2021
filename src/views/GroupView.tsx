import { useParams } from "react-router-dom";
import { GroupStandingsTable } from "components/GroupStandingsTable";
import {useSelector} from "react-redux";
import {getGroupByIdSelector} from "store/slices/groupsSlice";

export const GroupView = (): JSX.Element => {
    const { groupId } = useParams<{ groupId: string }>();
    const group = useSelector(getGroupByIdSelector(groupId))
    return (
        <div>
            <h2>Group {groupId}</h2>
            <GroupStandingsTable teams={group?.teams ?? []} />
        </div>
    );
};
