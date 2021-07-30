import "../scss/MobileNav.scss";
import { HashRouter as Router, Link } from "react-router-dom";

function MobileNav() {
  return (
    <Router>
      <div className="MobileNav">
        <div className="flex-container">
          <div>
            <Link to="/">
              <img src="https://via.placeholder.com/50" alt="home" />
              <br />
              首頁
            </Link>
          </div>
          <div>
            <Link to="/record">
              <img src="https://via.placeholder.com/50" alt="search" />
              <br />
              搜尋
            </Link>
          </div>
          <div>
            <Link to="/login">
              <img src="https://via.placeholder.com/50" alt="member" />
              <br />
              會員
            </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default MobileNav;
