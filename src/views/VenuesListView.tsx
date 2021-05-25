import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { venuesStateSelector } from "store/slices/venuesSlice";
import { Venue } from "store/models";
import { useLoadVenues } from "store/hooks/useLoadVenues";

export const VenuesListView = () => {
  useLoadVenues();
  const venuesState = useSelector(venuesStateSelector);

  if (venuesState.isLoading) return <div>Loading</div>;

  return (
    <>
      <Helmet>
        <title>Venues</title>
      </Helmet>
      <div>
        {venuesState.venues.map((venue: Venue) => (
          <div key={venue.id}>
            <img alt={venue.name} className={"img-fluid"} src={venue.photo} loading={"lazy"} />
            <br />
            {venue.name} {venue.city} {venue.capacity}
          </div>
        ))}
      </div>
    </>
  );
};
