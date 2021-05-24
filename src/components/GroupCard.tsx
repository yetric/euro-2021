import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Group } from "store/models";
import { Link } from "react-router-dom";
import styles from "./styles/GroupCard.module.css";
import { TeamIcon } from "./TeamIcon";
import { BiFootball } from "react-icons/bi";
import { FiArrowRight } from "react-icons/all";

interface GroupCardProps {
    group: Group;
}

export const GroupCard = (props: GroupCardProps): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Group {props.group.id}</Card.Title>
                <div className={styles.cities}>
                    {props.group.home.map((city) => (
                        <span key={city}>{city}</span>
                    ))}
                </div>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {props.group.teams.map((team) => {

                    let isHost = props.group.hosts.indexOf(team) > -1;

                    return (
                        <ListGroupItem className={styles.item} key={team}>
                            <TeamIcon team={team} />
                            <Link to={"/team/" + team}>{team}</Link>
                            {isHost && <span className={styles.host}><BiFootball /></span>}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
            <Card.Body>
                <Link to={`/group/${props.group.id}`}>Details <FiArrowRight /></Link>
            </Card.Body>
        </Card>
    );
};
