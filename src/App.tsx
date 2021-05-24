import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartView } from "views/StartView";
import { GroupView } from "views/GroupView";
import { useLoadGroups } from "store/hooks/useLoadGroups";
import { Layout } from "components/Layout";
import { ProfileView } from "./views/ProfileView";
import { TeamView } from "./views/TeamView";

function App() {
    useLoadGroups();

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={StartView} />
                    <Route exact path="/group/:groupId" component={GroupView} />
                    <Route exact path="/team/:teamId" component={TeamView} />
                    <Route exact path="/you" component={ProfileView} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
