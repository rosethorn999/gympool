import "./scss/shared.scss";
import "./scss/App.scss";
import { React } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Index from "./views/Index";
import AddRecord from "./views/AddRecord";
import Record from "./views/Record";
import Account from "./views/Account";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="router-view">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/addRecord" component={AddRecord} />
            <Route path="/record" component={Record} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
