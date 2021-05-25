import * as React from "react";
import { Fragment } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { TeamIcon } from "components/TeamIcon";
import { Match } from "store/models";

interface RoundMatches {
    roundName: string;
    matches: Match[];
}

interface MatchListProps {
    roundMatches: RoundMatches[];
}

export const MatchList = (props: MatchListProps): JSX.Element => {
    return (
        <ListGroup>
            {props.roundMatches.map((round, index) => (
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
    );
};
