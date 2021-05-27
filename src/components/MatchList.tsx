import * as React from "react";
import { Fragment } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { TeamIcon } from "components/TeamIcon";
import { Match } from "store/models";
import styles from "./styles/MatchList.module.css";
import { Link } from "react-router-dom";
import { IoCalendarOutline, IoTvOutline } from "react-icons/io5";

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
                                    <Link to={"/team/" + match.homeTeam.code}>
                                        <TeamIcon team={match.homeTeam.code} size={"small"} />
                                        {match.homeTeam.name}
                                    </Link>
                                </Col>
                                <Col sm={4} className="text-center align-self-center">
                                    <p className={styles.result}>0 - 0</p>
                                </Col>
                                <Col sm={4} className="text-center align-self-center">
                                    <Link to={"/team/" + match.awayTeam.code}>
                                        <TeamIcon team={match.awayTeam.code} size={"small"} />
                                        {match.awayTeam.name}
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={"text-center"}>
                                    <small>
                                        {match.matchDate} - {match.matchTime}
                                    </small>
                                </Col>
                                <Col className={"text-center"}>
                                    <small>
                                        <Link to={"/venues/" + match.venue.id}>
                                            {match.venue.name}
                                        </Link>
                                    </small>
                                </Col>
                            </Row>
                            <div className={styles.actions}>
                                <div className={styles.tv}>
                                    <a href={"#tv-shows"}>
                                        <IoTvOutline /> Visas på SVT Play
                                    </a>
                                </div>
                                <div>
                                    <ul className={styles.odds}>
                                        <li>1. 3.05</li>
                                        <li>X. 4.5</li>
                                        <li>2. 1.25</li>
                                    </ul>
                                </div>
                                <div className={styles.extra}>
                                    <IoCalendarOutline /> Lägg till i kalender
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </Fragment>
            ))}
        </ListGroup>
    );
};
