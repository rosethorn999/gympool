import "../scss/ResetPassword.scss";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";

function ResetPassword() {
  // TODO: Add captcha
  const history = useHistory();
  const { search } = useLocation();
  const reset_id = new URLSearchParams(search).get("id");

  const validate = (values) => {
    const errors = {};

    if (!values.id) {
      errors.id = "Required";
    } else if (!/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i.test(values.id)) {
      errors.invitation_id = "Invalid reset password id";
    }
    if (!values.password || !values.password2) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Too short";
    } else if (values.password !== values.password2) {
      errors.password = "Two password not align";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      id: reset_id,
      password: "",
      password2: "",
    },
    validate,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  function resetPassword(values) {
    let url = `/password-reset/${values.id}/`;
    basicRequest
      .patch(url, values)
      .then(() => {
        Swal.fire("完成", "密碼重設完成", "success").then(() => {
          history.push("/login");
        });
      })
      .catch(function (error) {
        const title = error.response.status.toString();
        let msg = JSON.stringify(error.response.data);
        if (error.response.status === 403) {
          msg = error.response.data.replace(
            "Unable to get user with provided credentials.",
            "請重新申請重設密碼"
          );
          Swal.fire(title, msg, "error").then(() => {
            history.push("/requestResetPassword");
          });
        }
        Swal.fire(title, msg, "error");
        console.error(error);
      });
  }
  function goHome() {
    history.push("/");
  }
  return (
    <div className="ResetPassword">
      <div className="login container">
        <form onSubmit={formik.handleSubmit}>
          <p>請輸入你的新密碼</p>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className={`text-box ${formik.errors.password ? "is-invalid" : null}`}
              placeholder="密碼"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
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
          </div>

          <div className="button-box">
            <button className="btn blue" onClick={goHome}>
              取消
            </button>
            <button type="submit" className="btn blue" disabled={!formik.isValid}>
              送出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
