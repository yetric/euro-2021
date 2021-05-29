import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartView } from "views/StartView";
import { GroupView } from "views/GroupView";
import { Layout } from "components/Layout";
import { ProfileView } from "./views/ProfileView";
import { TeamView } from "./views/TeamView";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLoadGroups } from "store/hooks/useLoadGroups";
import { useLoadTeams } from "store/hooks/useLoadTeams";
import { SignupView } from "./views/SignupView";
import { useLoadMatches } from "store/hooks/useLoadMatches";
import { PlayerView } from "./views/PlayerView";
import { VenuesListView } from "views/VenuesListView";
import { LoginView } from "views/LoginView";
import { AuthProvider } from "providers/AuthProvider";
import { TipsView } from "./views/TipsView";
import { VenueView } from "./views/VenueView";

function App() {
    useLoadGroups();
    useLoadTeams();
    useLoadMatches();

    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={StartView} />
                        <Route exact path="/login" component={LoginView} />
                        <Route exact path="/tips" component={TipsView} />
                        <Route exact path="/group/:groupId" component={GroupView} />
                        <Route exact path="/team/:teamId" component={TeamView} />
                        <Route exact path="/venues/:venueId" component={VenueView} />
                        <Route exact path="/venues" component={VenuesListView} />
                        <Route exact path="/player/:playerId" component={PlayerView} />
                        <Route exact path="/you" component={ProfileView} />
                        <Route exact path="/signup" component={SignupView} />
                    </Switch>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
