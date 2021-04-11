import "../scss/FooterBar.scss";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";

function FooterBar() {
  return (
    <Router>
      <footer className="FooterBar">
        <div className="footer-block">
          <div className="column">
            <p className="blue">關於</p>
            <ul>
              <li>
                <Link to="/motivation">創立動機</Link>
              </li>
              <li>
                <Link to="/success-story">成功案例</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <p className="blue">幫助</p>
            <ul>
              <li>
                <Link to="/qa">常見問題</Link>
              </li>
            </ul>
          </div>
          <div className="column fake"></div>
          <div className="column fans-container">
            <p className="blue">&nbsp;</p>
            <ul>
              <li className="fans-club">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  粉絲團
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="copyright">2019 Copyright</p>
      </footer>
    </Router>
  );
}

export default FooterBar;
