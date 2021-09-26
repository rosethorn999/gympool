import "../scss/MobileNav.scss";
import { useState, useEffect } from "react";
import { HashRouter as Router, Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/home.png";
import memberIcon from "../assets/member.png";
import searchIcon from "../assets/search.png";

function MobileNav() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <Router>
      <div className="MobileNav">
        <div className="flex-container">
          <div>
            <Link
              to="/"
              className={`${activeTab === "/" ? "active" : ""}`}
              onClick={() => setActiveTab("/")}
            >
              <img src={homeIcon} alt="home" />
              <br />
              首頁
            </Link>
          </div>
          <div>
            <Link
              to="/record"
              className={`${activeTab === "/record" ? "active" : ""}`}
              onClick={() => setActiveTab("/record")}
            >
              <img src={searchIcon} alt="search" />
              <br />
              搜尋
            </Link>
          </div>
          <div>
            <Link
              to="/login"
              className={`${activeTab === "/login" ? "active" : ""}`}
              onClick={() => setActiveTab("/login")}
            >
              <img src={memberIcon} alt="member" />
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
