import "../scss/Account.scss";
import { useState, useEffect } from "react";
import DatePick from "../components/DatePick";
import { useHistory } from "react-router-dom";
import store from "../store/index";

function Account() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [, setBirth_date] = useState("");
  const [county, setCounty] = useState("");

  const [facebook_id, setFacebook_id] = useState("");
  const [line_id, setLine_id] = useState("");
  const [tg_id, setTg_id] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");

  const [date_joined, setDate_joined] = useState("");
  const [modify_time, setModify_time] = useState("");
  const [last_login, setLast_login] = useState("");

  useEffect(() => {
    let user = store.getState().user.user;
    const {
      _id,
      first_name,
      last_name,
      username,
      email,
      birth_date,
      county,
      facebook_id,
      line_id,
      tg_id,
      mobile,
      phone,
    } = user;
    setId(_id);
    setFirst_name(first_name);
    setLast_name(last_name);
    setUsername(username);
    setEmail(email);
    setBirth_date(birth_date);
    setCounty(county);

    setFacebook_id(facebook_id);
    setLine_id(line_id);
    setTg_id(tg_id);
    setMobile(mobile);
    setPhone(phone);

    setDate_joined(date_joined);
    setModify_time(modify_time);
    setLast_login(last_login);
  }, [date_joined, last_login, modify_time]);

  function done() {
    // TODO save
    history.push(`/`);
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value.trim());
        break;
      default:
        break;
    }
  }
  function handleDateChange(v) {
    setBirth_date(v);
  }

  return (
    <div className="Account">
      <div className="container">
        <div className="block">
          <h3>會員資料</h3>
          <div className="form-group">
            <label>編號</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="id"
                  defaultValue={id}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>使用者名稱</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="username"
                  defaultValue={username}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>電子信箱</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="email"
                  defaultValue={email}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>名</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="first_name"
                  defaultValue={first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>姓</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="last_name"
                  defaultValue={last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>縣市</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="county"
                  defaultValue={county}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>生日</label>
            <div className="control-box">
              <div className="control-box">
                <DatePick
                  name="birth_date"
                  handleDateChange={(v) => handleDateChange(v)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>聯絡資料</h3>
          <div className="form-group">
            <label>臉書 id</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="facebook_id"
                  defaultValue={facebook_id}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Line id</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="line_id"
                  defaultValue={line_id}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Telegram id</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="tg_id"
                  defaultValue={tg_id}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>手機號碼</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="mobile"
                  defaultValue={mobile}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>市話號碼</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>安全性</h3>
          <div className="form-group">
            <label>加入日期</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="date_joined"
                  defaultValue={date_joined}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>修改日期</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="modify_time"
                  defaultValue={modify_time}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>上次登入時間</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="last_login"
                  defaultValue={last_login}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-box">
          <button className="btn blue" onClick={() => done()}>
            完成
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
