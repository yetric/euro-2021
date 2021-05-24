import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartView } from "views/StartView";
import { GroupView } from "views/GroupView";

function App() {
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
