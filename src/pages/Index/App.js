import "./scss/shared.scss";
import "./scss/App.scss";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import About from "./views/About";
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./views/Index";
import Record from "./views/Record";
import Accessory from "./views/Accessory";
import Article from "./views/Article";
import ScrollToTop from "./components/ScrollToTop";
import RecordDetail from "./views/RecordDetail";
import Notice from "./views/Notice";
import Invitation from "./views/Invitation";
import UserLogin from "./views/UserLogin";
import RequestResetPassword from "./views/RequestResetPassword";
import ResetPassword from "./views/ResetPassword";
import Register from "./views/Register";
import PrivacyPolicy from "./views/PrivacyPolicy";

import { Spinner } from "./components/Spinner";
import MobileNav from "./components/MobileNav";


function App() {
  return (
    <div className="App">
      <Router>
        <HeaderBar />
        <Spinner />
        <ScrollToTop />
        <MobileNav />

        <div className="router-container">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/record" component={Record} />
            <Route path="/accessory" component={Accessory} />
            <Route path="/article" component={Article} />
            <Route path="/recordDetail" component={RecordDetail} />
            <Route path="/notice" component={Notice} />
            <Route path="/invitation" component={Invitation} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={UserLogin} />
            <Route path="/requestResetPassword" component={RequestResetPassword} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
          </Switch>
        </div>

        <FooterBar />
      </Router>
    </div>
  );
}

export default App;
