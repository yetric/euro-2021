import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { leagueStateSelector, loadLeagueById } from "store/slices/leagueSlice";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { TipsView } from "views/TipsView";
import { createLeagueBetAsync, loadLeagueBetByUserIdAsync } from "store/slices/betsSlice";
import { authStateSelector } from "store/slices/authSlice";

export const LeagueView = (): JSX.Element => {
    const { leagueId } = useParams<{ leagueId: string }>();
    const dispatch = useDispatch();
    const leagueState = useSelector(leagueStateSelector);
    const authState = useSelector(authStateSelector);

    useEffect(() => {
        dispatch(loadLeagueById(leagueId));
        if (authState.login.user?.uid) {
            dispatch(loadLeagueBetByUserIdAsync(leagueId, authState.login.user?.uid));
        }
    }, [dispatch, authState, leagueId]);

    if (leagueState.isLoading) return <div>Loading...</div>;
    if (leagueState.hasError) return <>{leagueState.error}</>;

    const saveBets = () => {
        if (authState.login.user && authState.login.user.uid) {
            dispatch(createLeagueBetAsync(leagueId, authState.login.user?.uid));
        }
    };

    return (
        <div>
            <Helmet>
                <title>League {leagueId}</title>
            </Helmet>
            <h2>Liga: {leagueState.league?.name}</h2>
            <h2>Antal spelare: X / {leagueState.league?.maxCompetitors}</h2>
            <h2>Skapades: {new Date(leagueState.league?.createdAt ?? 0).toLocaleString()}</h2>
            <pre>av {JSON.stringify(leagueState.league?.owner, null, 1)}</pre>
            <Button disabled={!authState.login.isLoggedIn} onClick={saveBets}>
                Spara ditt tips
            </Button>
            <TipsView />
        </div>
    );
};
