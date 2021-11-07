import "../scss/Invitation.scss";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { open, close } from "../components/Spinner";
import { HashRouter as Router, Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";

function Invitation() {
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

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      requestInvitation(values);
    },
  });

  function requestInvitation(values) {
    open();
    let url = "/invitation/";

    basicRequest
      .post(url, values)
      .then(() => {
        Swal.fire(
          "認證信已經寄出",
          `請至 ${values.email} 點擊信中連結`,
          "success"
        ).then(() => {
          history.push("/");
        });
      })
      .catch((error) => {
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
    <div className="invitation">
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <p>用電子郵件註冊</p>
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
            <Router>
              <p>
                <Link to="/login">已有帳號? 直接登入</Link>
              </p>
            </Router>
          </div>
          <div className="button-box">
            <button type="submit" className="btn blue" disabled={!formik.isValid}>
              送出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Invitation;
