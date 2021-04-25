import "../scss/Invitation.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import basicRequest from "../../../apis/api";
import { open, close } from "../components/Spinner";
function Accessory() {
  const [email, setEmail] = useState("");
  const [dirty, setDirty] = useState({ email: false });
  const [invalidForm, setInvalidForm] = useState({ email: false });

  function validForm() {
    if (dirty.email === true) {
      const regex = new RegExp(
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      const v = !regex.test(email);
      setInvalidForm({ email: v });
    }
    return !invalidForm.email; // true=ok;false=ng
  }
  function requestInvitation() {
    let isValid = validForm();
    if (isValid) {
      open();
      let url = "/invitation/";
      let o = { email };

      basicRequest
        .post(url, o)
        .then(() => {
          Swal.fire("完成", "認證信已經寄出", "success");
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
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value.trim());
        if (dirty.email === false) {
          setDirty({ email: true });
        } else {
          validForm();
        }
        break;
      default:
        break;
    }
  }
  return (
    <div className="invitation">
      <div className="container">
        <p>用電子郵件註冊</p>
        <div className="form-group">
          <input
            name="email"
            type="text"
            className={`text-box ${invalidForm.email ? "is-invalid" : null}`}
            placeholder="電子信箱"
            onChange={handleChange}
          />
        </div>
        <div className="button-box">
          <button
            className="btn blue"
            disabled={invalidForm.email}
            onClick={requestInvitation}
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accessory;
