import "../scss/Nav.scss";
import { React, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/user";
import store from "../store/index";

function Nav() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [routerActive, setRouterActive] = useState("");

  const dispatch = useDispatch();
  const user = store.getState().user.user;
  const userName = user ? user.first_name + " " + user.last_name : "";

  useEffect(() => {
    setRouterActive(pathname);
  }, [pathname]);

  function switchRouter(e) {
    let targetPage = e.currentTarget.dataset.target;
    console.log(targetPage);
    history.push(`/targetPage`);
  }
  function clickLogout() {
    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <div className="Nav">
      <h1>GymPool</h1>
      <p>健身房合約轉讓庫</p>
      <div className="headImage"></div>
      <p>{userName}</p>
      <p>
        <button onClick={() => clickLogout()}>登出</button>
      </p>
      <div className="item-Menu">
        <ul>
          <li
            data-target
            className={`${routerActive === "/" ? "active" : null}`}
            onClick={() => switchRouter}
          >
            <Link to="/">我的拍賣</Link>
          </li>
          <li
            data-target="account"
            className={`${routerActive === "/account" ? "active" : null}`}
            onClick={() => switchRouter}
          >
            <Link to="/account">會員中心</Link>
          </li>
          <li>
            <a href="/">回首頁</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
