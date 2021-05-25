import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { venuesStateSelector } from "store/slices/venuesSlice";
import { Venue } from "store/models";
import { useLoadVenues } from "store/hooks/useLoadVenues";
import { VenueCard } from "components/VenueCard";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

export const VenuesListView = () => {
    useLoadVenues();
    const venuesState = useSelector(venuesStateSelector);

    if (venuesState.isLoading) return <div>Loading</div>;

    return (
        <>
            <Helmet>
                <title>Venues</title>
            </Helmet>
            <h2>Venues</h2>
            <Row>
                {venuesState.venues.map((venue: Venue, index) => (
                    <Col xs={12} sm={12} md={4} key={index}>
                        <VenueCard key={venue.id} venue={venue} />
                    </Col>
                ))}
            </Row>
        </>
    );
};
