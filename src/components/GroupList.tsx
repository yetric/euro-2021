import { useSelector } from "react-redux";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { Col, Row } from "react-bootstrap";
import {GroupCard} from "components/GroupCard";

export const GroupList = (): JSX.Element => {
    const groupState = useSelector(groupsStateSelector);

    if (groupState.isLoading) return <div>Loading...</div>;

    return (
        <Row>
            {groupState.groups.map((group) => {
                return (
                    <Col key={group.id}>
                        <GroupCard group={group} />
                    </Col>
                );
            })}
        </Row>
    );
};
