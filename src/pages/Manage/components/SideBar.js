import "../scss/SideBar.scss";
import { React, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/user";
import store from "../store/index";

function SideBar() {
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
    const targetPage = e.currentTarget.dataset.target;
    history.push(targetPage);
  }
  function clickLogout() {
    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <div className="SideBar">
      <div className="brand-area">
        <h1>GymPool</h1>
        <p>健身房合約轉讓庫</p>
      </div>
      <div className="avatar-area">
        <div className="headImage"></div>
        <p>{userName}</p>
        <p>
          <button className="btn" onClick={() => clickLogout()}>
            登出
          </button>
        </p>
      </div>

      <div className="item-menu">
        <ul>
          <li
            data-target="/"
            className={`${routerActive === "/" ? "active" : null}`}
            onClick={switchRouter}
          >
            <Link to="/">我的拍賣</Link>
          </li>
          <li
            data-target="/addRecord"
            className={`${routerActive === "/addRecord" ? "active" : null}`}
            onClick={switchRouter}
          >
            <Link to="/addRecord">新增商品</Link>
          </li>
          <li
            data-target="account"
            className={`${routerActive === "/account" ? "active" : null}`}
            onClick={switchRouter}
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

export default SideBar;
