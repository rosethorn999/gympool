import "./scss/shared.scss";
import "./scss/App.scss";
import { React } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Index from "./views/Index";
import AddRecord from "./views/AddRecord";
import Record from "./views/Record";
import Account from "./views/Account";
import HeaderBar from "./components/HeaderBar";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <HeaderBar />
      <div className="App">
        <SideBar />
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
console.log("hihi mars");
export default App;
