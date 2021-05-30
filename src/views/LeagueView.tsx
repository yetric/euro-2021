import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { leagueStateSelector, loadLeagueById } from "store/slices/leagueSlice";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export const LeagueView = (): JSX.Element => {
    const { leagueId } = useParams<{ leagueId: string }>();
    const dispatch = useDispatch();
    const leagueState = useSelector(leagueStateSelector);

    useEffect(() => {
        dispatch(loadLeagueById(leagueId));
    }, [dispatch]);

    if (leagueState.isLoading) return <div>Loading...</div>;
    if (leagueState.hasError) return <>{leagueState.error}</>;

    return (
        <div>
            <Helmet>
                <title>League {leagueId}</title>
            </Helmet>
            <h2>Liga: {leagueState.league?.name}</h2>
            <h2>Antal spelare: 0 / {leagueState.league?.maxCompetitors}</h2>
            <h2>Skapades: {new Date(leagueState.league?.createdAt ?? 0).toLocaleString()}</h2>
            <pre>av {JSON.stringify(leagueState.league?.owner, null, 1)}</pre>

            <Button>Skapa ditt tips</Button>
        </div>
    );
};
