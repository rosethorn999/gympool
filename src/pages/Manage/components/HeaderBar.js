import "../scss/HeaderBar.scss";
import { useState, useEffect } from "react";
import { HashRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/user";
import store from "../store/index";
// import { ReactComponent as BrandIcon } from "../assets/logo.svg";

function HeaderBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [mobileOverlayHeight, setMobileOverlayHeight] = useState("");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [triggerButtonClass, setTriggerButtonClass] = useState("");
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(store.getState().user.user);

  store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched),
    // we will update local component state and force component to re-render
    // with new data.
    setIsLoggedIn(store.getState().user.user);
  });

  useEffect(() => {
    triggerMobileMenu(false);
  }, [pathname]);

  function goIndex() {
    history.push(`/`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  function goRecords() {
    let key = search.trim();
    history.push(`/record?search=${key}`);
  }
  function clickLogout() {
    dispatch(logout());
    window.location.href = "./index.html";
  }
  function triggerMobileMenu(toStatus) {
    setIsMobileMenuOpened(toStatus);
    if (toStatus) {
      setMobileOverlayHeight("open");
      setTriggerButtonClass("closed");
      document.querySelector("body").style.overflow = "hidden";
    } else {
      setMobileOverlayHeight("");
      setTriggerButtonClass("");
      document.querySelector("body").style.overflow = "auto";
    }
  }

  return (
    <Router>
      <div className="HeaderBar">
        <header>
          <div className="logo-area" onClick={goIndex}>
            &nbsp;
            <Link to="/">GymPool</Link>
          </div>
          <div className="menu-area">
            <ul>
              <li>
                <Link to="/record">健身房會籍轉讓</Link>
              </li>
            </ul>
          </div>
          <div className="login-area">
            <ul>
              <li>
                <a href="./manage.html">我的拍賣</a>
              </li>
              |
              <li>
                {/* change to button elem due to eslint anchor-is-valid */}
                <button onClick={() => clickLogout()}>登出</button>
              </li>
            </ul>
          </div>

          {/* Mobile View */}
          <div className="mobile-menu-area" onClick={(o) => triggerMobileMenu(!isMobileMenuOpened)}>
            <div className={`trigger-button ${triggerButtonClass}`}>
              <p></p>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div
            className={`overlay ${mobileOverlayHeight}`}
            onClick={(o) => triggerMobileMenu(!isMobileMenuOpened)}
          >
            <div className="overlay-content">
              <ul>
                <li onClick={() => (window.location.href = "./manage.html")}>我的拍賣</li>
                <li onClick={() => clickLogout()}>登出</li>
              </ul>
              <ul>
                <li onClick={() => (window.location.href = "./index.html")}>回首頁</li>
              </ul>
            </div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default HeaderBar;
