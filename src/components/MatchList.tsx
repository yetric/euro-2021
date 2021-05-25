import * as React from "react";
import { Fragment } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { TeamIcon } from "components/TeamIcon";
import { Match } from "store/models";
import styles from "./styles/MatchList.module.css";
import { Link } from "react-router-dom";

interface RoundMatches {
    roundName: string;
    matches: Match[];
}

interface MatchListProps {
    roundMatches: RoundMatches[];
}

export const MatchList = (props: MatchListProps): JSX.Element => {
    return (
        <ListGroup className={styles.group}>
            {props.roundMatches.map((round, index) => (
                <Fragment key={index}>
                    <ListGroup.Item className={styles.header} key={`round-matches-header-${index}`}>
                        {round.roundName}
                    </ListGroup.Item>
                    {round?.matches.map((match, index) => (
                        <ListGroup.Item key={match.id}>
                            <Row className="text-center align-self-center">
                                <Col sm={4} className="text-center align-self-center">
                                    <h5>
                                        <Link to={"/team/" + match.homeTeam.code}>
                                            {match.homeTeam.name}
                                        </Link>
                                    </h5>
                                </Col>
                                <Col sm={1} className="text-center align-self-center">
                                    <TeamIcon team={match.homeTeam.code} size={"medium"} />
                                </Col>
                                <Col sm={2} className="text-center align-self-center">
                                    <small>{match.matchDate}</small>
                                    <h5>{match.matchTime}</h5>
                                    <small>
                                        <Link to={"/venues/" + match.venue.id}>
                                            {match.venue.name}
                                        </Link>
                                    </small>
                                </Col>
                                <Col sm={1} className="text-center align-self-center">
                                    <TeamIcon team={match.awayTeam.code} size={"medium"} />
                                </Col>
                                <Col sm={4} className="text-center align-self-center">
                                    <h5>
                                        <Link to={"/team/" + match.awayTeam.code}>
                                            {match.awayTeam.name}
                                        </Link>
                                    </h5>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </Fragment>
            ))}
        </ListGroup>
    );
};
