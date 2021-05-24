import { useParams } from "react-router-dom";
import { GroupStandingsTable } from "components/GroupStandingsTable";
import { useSelector } from "react-redux";
import { Col, ListGroup, Row } from "react-bootstrap";
import { getGroupByIDSelector } from "store/selectors";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { teamsStateSelector } from "store/slices/teamsSlice";

import {Helmet} from "react-helmet";
import { TeamIcon } from "../components/TeamIcon";

export const GroupView = (): JSX.Element => {
    const { groupId } = useParams<{ groupId: string }>();
    const groupState = useSelector(groupsStateSelector);
    const teamsState = useSelector(teamsStateSelector);
    const group = useSelector(getGroupByIDSelector(groupId));

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
            <ListGroup>
                <ListGroup.Item>
                    <Row className="text-center align-self-center">
                        <Col sm={4} className="text-center align-self-center">
                            <h4>Team Home</h4>
                        </Col>
                        <Col sm={1} style={{ background: "white" }}>
                            <TeamIcon team={"SWE"} size={"large"} />
                        </Col>
                        <Col sm={2} className="text-center align-self-center">
                            <h4>14:00</h4>
                        </Col>
                        <Col sm={1} style={{ background: "white" }}>
                            <TeamIcon team={"ESP"} size={"large"} />
                        </Col>
                        <Col sm={4} className="text-center align-self-center">
                            <h4>Team Away</h4>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
};
