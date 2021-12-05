import "../scss/Register.scss";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { open, close } from "../components/Spinner";
import { useFormik } from "formik";

function Register() {
  const history = useHistory();
  const { search } = useLocation();
  const invitation_id = new URLSearchParams(search).get("id");

  const validate = (values) => {
    const errors = {};

    if (!values.invitation_id) {
      errors.invitation_id = "Required";
    } else if (
      !/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i.test(values.invitation_id)
    ) {
      errors.invitation_id = "Invalid invitation_id";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 15) {
      errors.username = "Must be 15 characters or less";
    }
    if (!values.password || !values.password2) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Too short";
    } else if (values.password !== values.password2) {
      errors.password = "Two password not align";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    } else if (values.last_name.length > 20) {
      errors.last_name = "Must be 20 characters or less";
    }
    if (!values.first_name) {
      errors.first_name = "Required";
    } else if (values.first_name.length > 15) {
      errors.first_name = "Must be 15 characters or less";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      invitation_id,
      email: "",
      username: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
    },
    validate,
    onSubmit: (values) => {
      createUser(values);
    },
  });

  function createUser(values) {
    let url = "/user/";
    open();
    basicRequest
      .post(url, values)
      .then(() => {
        const msg = `${values.email} 已經可以使用`;
        Swal.fire("完成", msg, "success").then(() => {
          history.push("/login");
        });
      })
      .catch(function (error) {
        let msgs = [];
        if (error.response.status === 400) {
          let msg = error.response.data;
          const keys = Object.keys(msg);
          const commonMsg = {
            "This password is too common.": "密碼太過於常見",
            "This password is entirely numeric.": "密碼需由數字與英文組成",
            "user with this username already exists.": "此使用者名稱已被註冊",
            "invitation not exist.": "連結錯誤 請重開邀請信中連結",
          };
          keys.forEach((key) => {
            msg[key].forEach((msg) => {
              msgs.push(commonMsg[msg] || msg);
            });
          });
        }
        const title = error.response.status.toString();
        if (msgs.length > 0) {
          Swal.fire(title, msgs.join("<br>"), "error");
        } else {
          Swal.fire(title, JSON.stringify(error.response.data), "error");
        }
        console.error(error);
      })
      .finally(() => {
        close();
      });
  }
  return (
    <div className="Register container">
      {formik.errors.invitation_id ? (
        <p>邀請碼錯誤, 請參考電子信箱內的網址並重試</p>
      ) : (
        <div>
          <p>填妥以下資訊來完成註冊</p>
          <form onSubmit={formik.handleSubmit}>
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
                name="username"
                type="text"
                className={`text-box ${formik.errors.username ? "is-invalid" : null}`}
                placeholder="使用者名稱"
                onChange={formik.handleChange}
                value={formik.values.username}
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
              <input
                name="password2"
                type="password"
                className={`text-box ${formik.errors.password ? "is-invalid" : null}`}
                placeholder="確認密碼"
                onChange={formik.handleChange}
                value={formik.values.password2}
              />
            </div>
            <div className="form-group">
              <input
                name="last_name"
                type="text"
                className={`text-box ${formik.errors.last_name ? "is-invalid" : null}`}
                placeholder="姓"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
            </div>
            <div className="form-group">
              <input
                name="first_name"
                type="text"
                className={`text-box ${formik.errors.first_name ? "is-invalid" : null}`}
                placeholder="名"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
            </div>

            <div className="form-group">
              要深入了解 GymPool 如何收集、使用、分享及保護你的個人資料，請詳閱 GymPool 的
              <a href="#/privacyPolicy" target="_blank" rel="noreferrer">
                隱私權政策
              </a>
            </div>

            <div className="button-box">
              <button type="submit" className="btn blue" disabled={!formik.isValid}>
                送出
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
