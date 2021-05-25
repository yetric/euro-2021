import * as React from "react";
import { Venue } from "store/models";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "components/styles/GroupCard.module.css";

interface VenueCardProps {
    venue: Venue;
}

export const VenueCard = (props: VenueCardProps): JSX.Element => {
    return (
        <Card key={`card-venue-${props.venue.id}`}>
            <img className="card-img-top" src={props.venue.photo} alt={props.venue.name} />
            <Card.Body>
                <Card.Title>{props.venue.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem className={styles.item}>{props.venue.city}</ListGroupItem>
                <ListGroupItem className={styles.item}>
                    Capacity: {props.venue.capacity}
                </ListGroupItem>
                <ListGroupItem className={styles.item}>Opened: {props.venue.opened}</ListGroupItem>
            </ListGroup>
        </Card>
    );
};
