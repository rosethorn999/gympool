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
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
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
        Swal.fire("嗨, " + user.first_name, "歡迎回來", "success").then(() => {
          dispatch(login({ token, user }));
          history.push("/");
        });
      })
      .catch(function (error) {
        const title = error.response.status.toString();
        const msg = JSON.stringify(error.response.data);
        Swal.fire(title, msg, "error");
        console.error(error);
      })
      .finally(() => {
        close();
      });
  }

  return (
    <div className="UserLogin">
      <div className="login container">
        <form onSubmit={formik.handleSubmit}>
          <p>用電子郵件登入</p>
          <div className="form-group">
            <input
              name="email"
              className={`text-box ${
                formik.errors.email ? "is-invalid" : null
              }`}
              placeholder="電子信箱"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className={`text-box ${
                formik.errors.password ? "is-invalid" : null
              }`}
              placeholder="密碼"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="form-group">
            <Router>
              <p>
                <Link to="/resetPassword">忘記密碼?</Link>
              </p>
            </Router>
          </div>
          <div className="button-box">
            <button
              type="submit"
              className="btn blue"
              disabled={!formik.isValid}
            >
              送出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
