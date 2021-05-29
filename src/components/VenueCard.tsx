import * as React from "react";
import { Venue } from "store/models";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "components/styles/GroupCard.module.css";
import { Link } from "react-router-dom";

interface VenueCardProps {
    venue: Venue;
}

export const VenueCard = ({venue}: VenueCardProps): JSX.Element => {
    return (
        <Link to={"/venues/" + venue.id}><Card key={`card-venue-${venue.id}`} className={"mb-3"}>
            <img className="card-img-top" style={{width: "100%", height: "300px"}}src={venue.photo} alt={venue.name} />
            <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem className={styles.item}>{venue.city.length > 0 ? venue.city : "-"}</ListGroupItem>
                <ListGroupItem className={styles.item}>
                    Capacity: {parseInt(venue.capacity).toLocaleString("sv-se")}
                </ListGroupItem>
                <ListGroupItem className={styles.item}>Opened: {venue.opened}</ListGroupItem>
            </ListGroup>
        </Card></Link>
    );
};
