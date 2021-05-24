import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartView } from "views/StartView";
import { GroupView } from "views/GroupView";
import { useLoadGroups } from "store/hooks/useLoadGroups";
import { Layout } from "components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    useLoadGroups();

    return (
        <Layout>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={StartView} />
                    <Route exact path="/group/:groupId" component={GroupView} />
                </Switch>
            </BrowserRouter>
        </Layout>
    );
}

export default App;
