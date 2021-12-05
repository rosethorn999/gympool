import "../scss/UserLogin.scss";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { open, close } from "../components/Spinner";
import { HashRouter as Router, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/user";
import { useFormik } from "formik";

function UserLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (!/^.{8,}$/.test(values.password)) {
      errors.password = "Invalid password";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      clickLogin(values);
    },
  });
  function clickLogin(values) {
    open();
    basicRequest
      .post("/login/", values)
      .then((response) => {
        const token = "jwt " + response.data.token;
        const user = response.data.user;
        Swal.fire(`Hi ${user.first_name}`, "歡迎回來", "success").then(() => {
          dispatch(login({ token, user }));
          history.push("/");
        });
      })
      .catch(function (error) {
        const title = error.response.status.toString();
        let msg = JSON.stringify(error.response.data);
        if (error.response.status === 400) {
          msg = error.response.data.non_field_errors?.[0].replace(
            "Unable to log in with provided credentials.",
            "無法使用此帳號密碼登入"
          );
        }
        Swal.fire(title, msg, "error");
        console.error(error);
      })
      .finally(() => {
        close();
      });
  }
  function social_register(values) {
    open();

    const url = "/user/";
    basicRequest
      .post(url, values)
      .then(() => {
        clickLogin(values);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          let msg = error.response.data;
          const isAccountExist = msg.email?.some(
            (o) => o === "user with this email already exists."
          );
          if (isAccountExist) {
            clickLogin(values);
          }
        } else {
          let msgs = [];
          const title = error.response.status.toString();
          if (msgs.length > 0) {
            Swal.fire(title, msgs.join("<br>"), "error");
          } else {
            Swal.fire(title, JSON.stringify(error.response.data), "error");
          }
          console.error(error);
        }
      })
      .finally(() => {
        close();
      });
  }
  function fbLogin() {
    const payload = { auth_type: "rerequest", scope: "email,public_profile", return_scopes: true };
    window.FB.login(function (loginResponse) {
      if (loginResponse.status === "connected") {
        const { grantedScopes, accessToken } = loginResponse.authResponse;
        if (grantedScopes.includes("email")) {
          window.FB.api("/me", { fields: "id,name,email" }, (apiResponse) => {
            apiResponse["password"] = accessToken.substring(0, 12);
            apiResponse["is_social_login"] = true;
            apiResponse["username"] = apiResponse["id"];
            apiResponse["first_name"] = apiResponse["name"];
            apiResponse[""] = "";

            social_register(apiResponse);
          });
        } else {
          Swal.fire("權限不足", "請允許讀取Email資訊", "error");
        }
      } else {
        Swal.fire("權限不足", "請允許讀取臉書權限", "error");
      }
    }, payload);
  }

  return (
    <div className="UserLogin">
      <div className="login container">
        <form onSubmit={formik.handleSubmit}>
          <p>用電子郵件登入</p>
          <div className="form-group">
            <input
              name="email"
              className={`text-box ${formik.errors.email ? "is-invalid" : null}`}
              placeholder="電子信箱"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className={`text-box ${formik.errors.password ? "is-invalid" : null}`}
              placeholder="密碼"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="form-group">
            <Router>
              <p>
                <Link to="/requestResetPassword">忘記密碼?</Link>
              </p>
            </Router>
          </div>
          <div className="button-box">
            <button type="submit" className="btn blue" disabled={!formik.isValid}>
              送出
            </button>
          </div>
        </form>
        <h4 className="spreader">
          <span>OR</span>
        </h4>
        <div>
          <div className="button-box">
            <button className="btn blue" onClick={() => fbLogin()}>
              Facebook 登入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
