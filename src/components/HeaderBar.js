import "../scss/HeaderBar.scss";
import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";

function HeaderBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [mobileOverlayHeight, setMobileOverlayHeight] = useState("");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [triggerButtonClass, setTriggerButtonClass] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    triggerMobileMenu(false);
  }, [pathname]);

  const logined = false;

  function goIndex() {
    history.push(`/`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  function goRecords() {
    let key = search.trim();
    history.push(`/record?search=${key}`);
  }
  function logout() {
    // this.$store.commit("logout");
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
      <header>
        <div className="logo-area" onClick={goIndex}>
          <b>
            <Link to="/">GymPool</Link>
          </b>
        </div>
        <div className="menu-area">
          <ul>
            <li>
              <Link to="/record">健身房會籍轉讓</Link>
            </li>
            |
            <li>
              <Link to="/accessory">配件</Link>
            </li>
            |
            <li>
              <Link to="/article">文章</Link>
            </li>
          </ul>
        </div>
        <div className="search-bar">
          <select className="search-select">
            <option value="1">標題</option>
          </select>
          <input
            name="search"
            type="text"
            className="search-textbox"
            onChange={handleChange}
          />
          <button type="button" className="btn search-btn" onClick={goRecords}>
            查詢
          </button>
        </div>
        <div className="login-area">
          {logined ? (
            <ul>
              <li>
                <a href="./manage.html" vue-ref="./manage.html">
                  管理後台
                </a>
              </li>
              <li>
                <a href="#logout" vue-ref="#logout" onClick={logout()}>
                  登出
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/invitation">註冊</Link>
              </li>
              |
              <li>
                <Link to="/login">&nbsp;登入</Link>
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
                <option value="1">標題</option>
              </select>
              <input
                name="search"
                type="text"
                className="search-textbox"
                onChange={handleChange}
              />
              <button className="btn search-btn" onClick={goRecords}>
                查詢
              </button>
            </div>
            {logined ? (
              <ul>
                <li>
                  <a href="./manage.html" vue-ref="./manage.html">
                    管理後台
                  </a>
                </li>
                <li>
                  <a href="logout" vue-ref="#logout" onClick={logout}>
                    登出
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/invitation">註冊</Link>
                </li>
                <li>
                  <Link to="/login">登入</Link>
                </li>
              </ul>
            )}
            <ul>
              <li>
                <Link to="/record">健身房會籍轉讓</Link>
              </li>
              <li>
                <Link to="/login">配件</Link>
              </li>
              <li>
                <Link to="/article">文章</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </Router>
  );
}

export default HeaderBar;
