import { useSelector } from "react-redux";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { CardGroup } from "react-bootstrap";
import { GroupCard } from "components/GroupCard";
import { GroupDetailed } from "store/models";
import { chunks } from "utils/core";
import styles from "./styles/GroupList.module.css";

export const GroupList = (): JSX.Element => {
    const groupState = useSelector(groupsStateSelector);

    if (groupState.isLoading) return <div>Loading...</div>;

    return (
        <>
            {chunks(groupState.groups, 3).map((chunk, index) => {
                return (
                    <CardGroup key={"row-" + index} className={styles.group}>
                        {chunk.map((group: GroupDetailed, index: number) => {
                            return <GroupCard key={"card-" + index} group={group} />;
                        })}
                    </CardGroup>
                );
            })}
        </>
    );
};
