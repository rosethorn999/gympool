import "../scss/ResetPassword.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [sn, setSn] = useState("");
  const [dirty, setDirty] = useState({ email: false, sn: false });
  const [invalidForm, setInvalidForm] = useState({ email: false, sn: false });

  function validForm_email() {
    setInvalidForm({
      ...invalidForm,
      email: email.trim() === "" || email.trim().indexOf(" ") > 0,
    });
  }
  function validForm_sn() {
    setInvalidForm({
      ...invalidForm,
      sn: sn.trim() === "" || sn.trim().indexOf(" ") > 0,
    });
  }
  function validForm() {
    if (dirty.email === false || dirty.password === false) {
      validForm_email();
      validForm_sn();
    } else {
      return !(invalidForm.email || invalidForm.sn);
    }
  }
  function resetPassword() {
    let isValid = validForm();
    if (isValid) {
      let url = "/password-reset/";
      let o = { email, sn };
      basicRequest
        .put(url, o)
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
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value.trim());
        if (dirty.email === false) {
          setDirty({ email: true, sn: sn });
        } else {
          validForm();
        }
        break;
      case "sn":
        setSn(event.target.value.trim());
        if (dirty.sn === false) {
          setDirty({ email: email, sn: true });
        } else {
          validForm();
        }
        break;
      default:
        break;
    }
  }
  function goBack() {
    history.goBack();
  }
  return (
    <div className="ResetPassword">
      <div className="login container">
        <p>新密碼將會寄到你的信箱</p>
        <div className="form-group">
          <input
            name="email"
            type="text"
            className={`text-box ${invalidForm.email ? "is-invalid" : null}`}
            placeholder="電子信箱"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            name="sn"
            type="text"
            className={`text-box ${invalidForm.sn ? "is-invalid" : null}`}
            placeholder="身分證字號"
            onChange={handleChange}
          />
        </div>
        <div className="button-box">
          <button className="btn blue" onClick={goBack}>
            回上一頁
          </button>
          <button className="btn blue" onClick={resetPassword}>
            送出
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
