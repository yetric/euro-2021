import { useParams } from "react-router-dom";
import { GroupStandingsTable } from "components/GroupStandingsTable";
import { useSelector } from "react-redux";
import { Col, ListGroup, Row } from "react-bootstrap";
import { getGroupByIDSelector } from "store/selectors";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { teamsStateSelector } from "store/slices/teamsSlice";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { TeamIcon } from "../components/TeamIcon";
import { getGroupMatchesSelector } from "store/slices/matchesSlice";

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
            <ListGroup>
                {roundMatches.map((round, index) => (
                    <Fragment key={index}>
                        <ListGroup.Item
                            active
                            className={"text-center"}
                            key={`round-matches-header-${index}`}>
                            {round.roundName}
                        </ListGroup.Item>
                        {round?.matches.map((match, index) => (
                            <ListGroup.Item key={match.id}>
                                <Row className="text-center align-self-center">
                                    <Col sm={4} className="text-center align-self-center">
                                        <h4>{match.homeTeam.name}</h4>
                                    </Col>
                                    <Col sm={1} className="text-center align-self-center">
                                        <TeamIcon team={match.homeTeam.code} size={"large"} />
                                    </Col>
                                    <Col sm={2} className="text-center align-self-center">
                                        <small>{match.matchDate}</small>
                                        <h5>{match.matchTime}</h5>
                                        <small>{match.venue.name}</small>
                                    </Col>
                                    <Col sm={1} className="text-center align-self-center">
                                        <TeamIcon team={match.awayTeam.code} size={"large"} />
                                    </Col>
                                    <Col sm={4} className="text-center align-self-center">
                                        <h4>{match.awayTeam.name}</h4>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </Fragment>
                ))}
            </ListGroup>
        </div>
    );
};
