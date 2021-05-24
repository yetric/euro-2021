import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Group } from "store/models";
import { Link } from "react-router-dom";
import styles from "./styles/GroupCard.module.css";
import { TeamIcon } from "./TeamIcon";

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
                        <ListGroupItem key={team}>
                            <TeamIcon team={team} />
                            {team}
                            {isHost && <span className={styles.host}>HOST</span>}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
            <Card.Body>
                <Link to={`/group/${props.group.id}`}>More</Link>
            </Card.Body>
        </Card>
    );
};
