import "../scss/HeaderBar.scss";
import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/user";
import store from "../store/index";

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
  function handleChange(event) {
    switch (event.target.name) {
      case "search":
        setSearch(event.target.value.trim());
        break;
      default:
        break;
    }
  }

  return (
    <Router>
      <div className="HeaderBar">
        <header>
          <div className="logo-area" onClick={goIndex}>
            <b>
              <Link to="/">GymPool</Link>
            </b>
          </div>
          <div className="menu-area">
            <ul>
              <li>
                <Link to="/record">?????????????????????</Link>
              </li>
              |
              <li>
                <Link to="/accessory">??????</Link>
              </li>
              |
              <li>
                <Link to="/article">??????</Link>
              </li>
            </ul>
          </div>
          <div className="search-bar">
            <select className="search-select">
              <option value="1">??????</option>
            </select>
            <input
              name="search"
              type="text"
              className="search-text-box"
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn search-btn"
              onClick={() => goRecords()}
            >
              ??????
            </button>
          </div>
          <div className="login-area">
            {isLoggedIn ? (
              <ul>
                <li>
                  <a href="./manage.html">????????????</a>
                </li>
                |
                <li>
                  <a href="logout" onClick={() => clickLogout()}>
                    ??????
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/invitation">??????</Link>
                </li>
                |
                <li>
                  <Link to="/login">&nbsp;??????</Link>
                </li>
              </ul>
            )}
          </div>
          <div
            className="mobile-menu-area"
            onClick={(o) => triggerMobileMenu(!isMobileMenuOpened)}
          >
            <div className={`trigger-button ${triggerButtonClass}`}>
              <p></p>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div className={`overlay ${mobileOverlayHeight}`}>
            <div className="overlay-content">
              <div className="search-bar-mobile">
                <select className="search-select">
                  <option value="1">??????</option>
                </select>
                <input
                  name="search"
                  type="text"
                  className="search-text-box"
                  onChange={handleChange}
                />
                <button className="btn search-btn" onClick={goRecords}>
                  ??????
                </button>
              </div>
              {isLoggedIn ? (
                <ul>
                  <li>
                    <a href="./manage">????????????</a>
                  </li>
                  <li>
                    <a
                      href="logout"
                      vue-ref="#logout"
                      onClick={() => clickLogout()}
                    >
                      ??????
                    </a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/invitation">??????</Link>
                  </li>
                  <li>
                    <Link to="/login">??????</Link>
                  </li>
                </ul>
              )}
              <ul>
                <li>
                  <Link to="/record">?????????????????????</Link>
                </li>
                <li>
                  <Link to="/accessory">??????</Link>
                </li>
                <li>
                  <Link to="/article">??????</Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default HeaderBar;
