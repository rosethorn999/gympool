import "../scss/ResetPassword.scss";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

function ResetPassword() {
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
    if (!values.sn) {
      errors.sn = "Required";
    } else if (!/^[A-Z]\d{9}$/.test(values.sn)) {
      errors.sn = "Invalid sn";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      sn: "",
    },
    validate,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  function resetPassword(values) {
    let url = "/password-reset/";
    basicRequest
      .put(url, values)
      .then(() => {
        const msg = `新密碼已經寄到你的信箱: ${this.email}.`;
        Swal.fire("完成", msg, "success");
      })
      .catch(function (error) {
        const title = error.response.status.toString();
        const msg = JSON.stringify(error.response.data);
        Swal.fire(title, msg, "error");
        console.error(error);
      });
  }
  function goBack() {
    history.goBack();
  }
  return (
    <div className="ResetPassword">
      <div className="login container">
        <form onSubmit={formik.handleSubmit}>
          <p>新密碼將會寄到你的信箱</p>
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
              name="sn"
              type="text"
              className={`text-box ${formik.errors.sn ? "is-invalid" : null}`}
              placeholder="身分證字號"
              onChange={formik.handleChange}
              value={formik.values.sn}
            />
          </div>
          <div className="button-box">
            <button className="btn blue" onClick={goBack}>
              回上一頁
            </button>
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

export default ResetPassword;
