import "../scss/AddRecord.scss";
import selections from "../assets/selections.json";
import DatePick from "../components/DatePick";
import basicRequest from "../../../apis/api";
import Swal from "sweetalert2";
import zipCode from "../assets/twZipCode.json";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";

function AddRecord() {
  const history = useHistory();
  const [price, setPrice] = useState(0); // this field only show in frontend, not saved
  const [districts, setDistricts] = useState([]);
  const [productLife, setProductLife] = useState("");

  const selection = {
    zipCode,
    gym_types: selections[0].list,
    features: selections[1].list,
  };
  function calcPrice(monthly_rental, expiry_date, processing_fee) {
    let d = new Date(expiry_date).getTime();
    if (d) {
      let now = new Date().getTime();

      const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
      const v = monthly_rental * monthCount + processing_fee;
      setPrice(v);
    }
  }
  function backToList() {
    history.push(`/`);
  }
  function addRecord(values) {
    let url = "/record/";
    basicRequest
      .post(url, values)
      .then(() => {
        Swal.fire("成功上架", "", "success").then(() => {
          history.push(`/`);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function calcProductLife(expiry_date) {
    let ret = "";

    let now = new Date();
    let nowYYYY = now.getFullYear();
    let nowMM = now.getMonth() + 1;

    let expiryArr = expiry_date.split("-");
    expiryArr = expiryArr.map(function (item) {
      return Number(item);
    });
    let YYYY = expiryArr[0];
    let MM = expiryArr[1];
    if (YYYY === -1 || MM === -1) {
      ret = "無法計算";
    } else if (nowYYYY > YYYY) {
      ret = "過期了";
    } else if (nowYYYY === YYYY && nowMM >= MM) {
      ret = "過期了";
    } else {
      ret = "剩下";
      let life = MM - nowMM < 0 ? 12 - nowMM + MM : MM - nowMM;
      life += "個月";
      if (YYYY > nowYYYY) {
        let gap = MM - nowMM < 0 ? -1 : 0;
        if (YYYY - nowYYYY + gap !== 0) {
          ret += YYYY - nowYYYY + gap + "年";
        }
      }
      ret += life;
    }

    setProductLife(ret);
  }
  return (
    <div className="AddRecord">
      <div className="container">
        <Formik
          initialValues={{
            title: "",
            // price: 0,
            monthly_rental: 0,
            gym_type: null,
            store: "",
            county: "",
            district: "",
            remark: "",
            inventory: 1, // Fix to 1
            expiry_date: "",

            features: [],
            processing_fee: 0,
          }}
          validate={(values) => {
            console.log(values);
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (values.monthly_rental === 0) {
              errors.monthly_rental = "Required";
            } else if (values.monthly_rental > 10000) {
              errors.monthly_rental = "Invalid monthly_rental";
            }
            if (!values.gym_type) {
              errors.monthly_rental = "Required";
            }
            if (!values.store) {
              errors.store = "Required";
            }
            if (!values.county) {
              errors.county = "Required";
            }
            if (!values.district) {
              errors.district = "Required";
            }
            if (!values.expiry_date) {
              errors.expiry_date = "Required";
            }
            if (values.processing_fee > 10000) {
              errors.processing_fee = "Invalid processing_fee";
            }

            return errors;
          }}
          onSubmit={(values) => {
            addRecord(values);
          }}
        >
          {({ values, errors, isValid, setFieldValue }) => (
            <Form>
              <div className="block">
                <h3>基本資料</h3>
                <div className="form-group">
                  <label htmlFor="title">標題</label>
                  <div className="control-box">
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={`text-box ${errors.title ? "is-invalid" : null}`}
                    />
                  </div>
                </div>
              </div>
              <div className="block">
                <h3>合約資料</h3>
                <div className="form-group">
                  <label htmlFor="price">價格</label>
                  <div className="control-box">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className={`text-box ${errors.price ? "is-invalid" : null}`}
                      disabled
                      value={price}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="monthly_rental">月費</label>
                  <div className="control-box">
                    <Field
                      id="monthly_rental"
                      type="number"
                      name="monthly_rental"
                      className={`text-box ${errors.monthly_rental ? "is-invalid" : null}`}
                      value={values.monthly_rental}
                      onChange={(e) => {
                        const monthly_rental = Number(e.target.value);
                        setFieldValue("monthly_rental", monthly_rental);

                        calcPrice(monthly_rental, values.expiry_date, values.processing_fee);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="gym_type"> 會籍</label>
                  <div className="control-box">
                    <Field
                      as="select"
                      id="gym_type"
                      name="gym_type"
                      className={`text-box ${errors.monthly_rental ? "is-invalid" : null}`}
                      value={values.gym_type}
                    >
                      <option value="-1" disabled>
                        會籍
                      </option>
                      {selection.gym_types.map((item) => {
                        return (
                          <option key={item.name} value={item.val}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="store">店家</label>
                  <div className="control-box">
                    <Field
                      id="store"
                      type="text"
                      name="store"
                      className={`text-box ${errors.store ? "is-invalid" : null}`}
                      value={values.store}
                    />
                  </div>
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="county"> 所在地</label>
                  <div className="control-box">
                    <Field
                      as="select"
                      id="county"
                      name="county"
                      className={`text-box ${errors.county ? "is-invalid" : null}`}
                      value={values.county}
                      onChange={(e) => {
                        const county = e.target.value;
                        let ret = [];
                        let selectedDistricts = selection.zipCode.filter((item) => {
                            return item.name === county;
                        });

                        if (selectedDistricts.length > 0) {
                          ret = selectedDistricts[0].districts;
                        }
                        setDistricts(ret);

                        setFieldValue("county", county);
                      }}
                    >
                      <option value="null">縣市</option>
                      {selection.zipCode.map((county) => (
                        <option key={county.name} value={county.name}>
                          {county.name}
                        </option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="district"
                      className={`text-box ${errors.district ? "is-invalid" : null}`}
                      value={values.district}
                    >
                      <option value="null">行政區</option>
                      {districts.map((district) => {
                        return (
                          <option key={district.val} value={district.name}>
                            {district.name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </div>
                <div className="form-group">
                  {/* TODO:datepicker */}
                  <label>到期日</label>
                  <div className="control-box">
                    <DatePick
                      isFullYYYY={false}
                      name="expiry_date"
                      handleDateChange={(v) => {
                        setFieldValue("expiry_date", v);
                        calcPrice(values.monthly_rental, v, values.processing_fee);
                        calcProductLife(v);
                      }}
                    />
                    <div className="expiry_date">{productLife}</div>
                  </div>
                </div>
              </div>
              <div className="block">
                <h3>店家資料</h3>
                <div className="form-group">
                  <label>場館特色</label>
                  <div className="control-box" role="group">
                    <FieldArray
                      name="features"
                      render={(arrayHelpers) => (
                        <div>
                          {selection.features.map((f) => (
                            <div key={f.val}>
                              <label>
                                <input
                                  name="features"
                                  type="checkbox"
                                  value={f.val}
                                  checked={values.features.includes(f.val)}
                                  onChange={(e) => {
                                    if (e.target.checked)
                                      arrayHelpers.push(f.val);
                                    else {
                                      const idx = values.features.indexOf(
                                        f.val
                                      );
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                />{" "}
                                {f.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="block">
                <h3>其他費用</h3>
                <div className="form-group">
                  <label htmlFor="processing_fee">轉讓費</label>
                  <div className="control-box">
                    <Field
                      type="number"
                      name="processing_fee"
                      className={`text-box ${errors.processing_fee ? "is-invalid" : null}`}
                      value={values.processing_fee}
                      onChange={(e) => {
                        const processing_fee = Number(e.target.value);
                        setFieldValue("processing_fee", processing_fee);

                        calcPrice(values.monthly_rental, values.expiry_date, processing_fee);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="block">
                <h3>其他</h3>
                <div className="form-group">
                  <label htmlFor="remark">備註</label>
                  <div className="control-box">
                    <Field
                      as="textarea"
                      name="remark"
                      rows="5"
                      className={`text-box ${errors.remark ? "is-invalid" : null}`}
                    />
                  </div>
                </div>
              </div>

              <div className="button-box">
                <button className="btn" onClick={() => backToList()}>
                  取消
                </button>
                <button type="submit" className="btn blue" disabled={!isValid}>
                  送出
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddRecord;
