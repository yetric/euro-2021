import { useParams } from "react-router-dom";

export const GroupView = (): JSX.Element => {
    const { groupId } = useParams<{ groupId: string }>();
    return <div>Group {groupId}</div>;
};
