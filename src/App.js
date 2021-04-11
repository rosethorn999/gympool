import "./scss/shared.scss";
import "./scss/App.scss";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import About from "./components/About";
import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import Record from "./components/Record";
import Accessory from "./components/Accessory";
import Article from "./components/Article";
import ScrollToTop from "./components/ScrollToTop";
import RecordDetail from "./components/RecordDetail";
import Notice from "./components/Notice";
import Invitation from "./components/Invitation";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";

import { Spinner } from "./components/Spinner";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderBar />
        <Spinner />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/record" component={Record} />
          <Route path="/accessory" component={Accessory} />
          <Route path="/article" component={Article} />
          <Route path="/recordDetail" component={RecordDetail} />
          <Route path="/notice" component={Notice} />
          <Route path="/invitation" component={Invitation} />
          <Route path="/login" component={Login} />
          <Route path="/resetPassword" component={ResetPassword} />
        </Switch>

        <FooterBar></FooterBar>
      </Router>
    </div>
  );
}

export default App;
