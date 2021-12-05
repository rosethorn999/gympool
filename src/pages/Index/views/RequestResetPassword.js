import "../scss/RequestResetPassword.scss";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { open, close } from "../components/Spinner";

function RequestResetPassword() {
  // TODO: Add captcha
  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  function resetPassword(values) {
    open();

    const url = "/password-reset/";
    basicRequest
      .post(url, values)
      .then(() => {
        Swal.fire("完成", "連結已經寄到你的信箱", "success").then(() => {
          history.push("/");
        });
      })
      .catch(function (error) {
        const title = error.response.status.toString();
        let msg = JSON.stringify(error.response.data);
        if (error.response.status === 403) {
          msg = error.response.data.replace(
            "Unable to get user with provided credentials.",
            "無法找到該名使用者"
          );
        }
        Swal.fire(title, msg, "error");
        console.error(error);
      })
      .finally(() => {
        close();
      });
  }
  function goBack() {
    history.goBack();
  }
  return (
    <div className="RequestResetPassword">
      <div className="login container">
        <form onSubmit={formik.handleSubmit}>
          <p>重設連結將會寄到你的信箱</p>
          <div className="form-group">
            <input
              name="email"
              className={`text-box ${formik.errors.email ? "is-invalid" : null}`}
              placeholder="電子信箱"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="button-box">
            <button className="btn blue" onClick={goBack}>
              回上一頁
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

export default RequestResetPassword;
