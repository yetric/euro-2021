import { useLoadGroups } from "store/hooks/useLoadGroups";
import { useSelector } from "react-redux";
import { groupsStateSelector } from "store/slices/groupsSlice";

export const GroupList = (): JSX.Element => {
    useLoadGroups();
    const groupState = useSelector(groupsStateSelector);

    if (groupState.isLoading) return <div>Loading spinner...</div>;

    return (
        <div>
            {groupState.groups.map((group) => {
                return (
                    <div key={group.id}>
                        <strong>Grupp {group.id}</strong>
                        {group.teams.map((team) => (
                            <div key={team}>{team}</div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
