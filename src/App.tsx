import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartView } from "views/StartView";
import { GroupView } from "views/GroupView";
import { useLoadGroups } from "store/hooks/useLoadGroups";

function App() {
    useLoadGroups();

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={StartView} />
                <Route exact path="/group/:groupId" component={GroupView} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
