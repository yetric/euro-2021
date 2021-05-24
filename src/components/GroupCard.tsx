import { Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Group } from "store/models";
import { Link } from "react-router-dom";

interface GroupCardProps {
    group: Group;
}

export const GroupCard = (props: GroupCardProps): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Group {props.group.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {props.group.teams.map((team) => (
                    <ListGroupItem>{team}</ListGroupItem>
                ))}
            </ListGroup>
            <Card.Body>
                <Card.Link>
                    <Link to={`/group/${props.group.id}`}>See more</Link>
                </Card.Link>
            </Card.Body>
        </Card>
    );
};
