import { useLoadGroups } from "store/hooks/useLoadGroups";
import { useSelector } from "react-redux";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { Link } from "react-router-dom";

export const GroupList = (): JSX.Element => {
    useLoadGroups();
    const groupState = useSelector(groupsStateSelector);

    if (groupState.isLoading) return <div>Loading...</div>;

    return (
        <div>
            {groupState.groups.map((group) => {
                return (
                    <div key={group.id}>
                        <Link to={`/group/${group.id}`}>Group {group.id}</Link>
                        {group.teams.map((team) => (
                            <div key={team}>{team}</div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
