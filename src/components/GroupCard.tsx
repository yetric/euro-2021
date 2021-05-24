import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { GroupDetailed } from "store/models";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/all";
import { TeamIcon } from "./TeamIcon";
import styles from "./styles/GroupCard.module.css";

interface GroupCardProps {
    group: GroupDetailed;
}

export const GroupCard = (props: GroupCardProps): JSX.Element => {
    return (
        <Card key={`card-${props.group.id}`}>
            <Card.Body>
                <Card.Title>Group {props.group.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {props.group.teams.map((team, index) => (
                    <ListGroupItem className={styles.item} key={index}>
                        {team && <TeamIcon team={team.code} />}
                        {team && <Link to={"/team/"+team.code}>{team.name}</Link>}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Card.Body>
                <Link to={`/group/${props.group.id}`}>Details <FiArrowRight /></Link>
            </Card.Body>
        </Card>
    );
};
