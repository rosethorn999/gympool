import selections from "../assets/selections.json";
import DatePick from "../components/DatePick";
import basicRequest from "../../../apis/api";
import Swal from "sweetalert2";
import zipCode from "../assets/twZipCode.json";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function AddRecord() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [gym_type, setGym_type] = useState(-1);
  const [store, setStore] = useState("");
  const [monthly_rental, setMonthly_rental] = useState(0);
  const [price, setPrice] = useState(0);

  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [expiry_date, setExpiry_date] = useState("");
  const [remark, setRemark] = useState("");
  const [features, setFeatures] = useState([]);
  const [processing_fee, setProcessing_fee] = useState(0);
  const [productLife, setProductLife] = useState("");

  const selection = {
    zipCode,
    gym_types: selections[0].list,
    features: selections[1].list,
  };

  useEffect(() => {
    let d = new Date(expiry_date).getTime();
    if (d) {
      let now = new Date().getTime();

      const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
      const v = monthly_rental * monthCount + processing_fee;
      setPrice(v);
    }
  }, [monthly_rental, expiry_date, processing_fee]);

  function backToList() {
    history.push(`/`);
  }
  function done() {
    let url = "/record/";
    let o = {
      monthly_rental: monthly_rental,
      title: title,
      processing_fee: processing_fee,
      store: store,
      county: county,
      district: district,
      remark: remark,
      inventory: 1, // Fix to 1
      expiry_date: expiry_date,
      gym_type: gym_type,
      features: features,
    };
    basicRequest
      .post(url, o)
      .then(() => {
        Swal.fire("成功上架", "", "success").then(() => {
          history.push(`/`);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value.trim());
        break;
      case "gym_type":
        debugger;
        setGym_type(event.target.value.trim());
        break;
      case "county":
        setCounty(event.target.value.trim());
        break;
      case "monthly_rental":
        setMonthly_rental(event.target.value.trim());
        break;
      case "store":
        setStore(event.target.value.trim());
        break;
      case "district":
        setDistrict(event.target.value.trim());
        break;
      case "remark":
        setRemark(event.target.value.trim());
        break;
      case "features":
        let newFeatures = features;
        if (event.target.checked) {
          newFeatures = [...features, event.target.value];
        } else {
          newFeatures = features.filter((o) => o !== event.target.value);
        }
        setFeatures(newFeatures);
        break;
      case "processing_fee":
        setProcessing_fee(Number(event.target.value.trim()));
        break;
      default:
        break;
    }
  }
  function handleDateChange(v) {
    setExpiry_date(v);
  }

  useEffect(() => {
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
  }, [expiry_date]);

  useEffect(() => {
    let ret = [];
    let selectedDistricts = selection.zipCode.filter((item) => {
      return item.name === county;
    });

    if (selectedDistricts.length > 0) {
      ret = selectedDistricts[0].districts;
    }
    setDistricts(ret);
  }, [county, selection.zipCode]);

  useEffect(() => {
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
  }, [expiry_date]);

  return (
    <div className="record">
      <div className="container">
        <div className="block">
          <h3>基本資料</h3>
          <div className="form-group">
            <label>標題</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>合約資料</h3>
          <div className="form-group">
            <label>價格</label>
            <div className="control-box">
              <div className="control-box">
                <input type="number" name="price" value={price} disabled />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>月費</label>
            <div className="control-box">
              <div className="control-box">
                <input
                  type="number"
                  name="monthly_rental"
                  value={monthly_rental}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>會籍</label>
            <div className="control-box">
              <select name="gym_type" value={gym_type} onChange={handleChange}>
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
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>店家</label>
            <div className="control-box">
              <input
                type="text"
                name="store"
                value={store}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>所在地</label>
            <div className="control-box">
              <select name="county" value={county} onChange={handleChange}>
                <option value="null">縣市</option>
                {selection.zipCode.map((county) => (
                  <option key={county.name} value={county.name}>
                    {county.name}
                  </option>
                ))}
              </select>
              <select name="district" value={district} onChange={handleChange}>
                <option value="null">行政區</option>
                {districts.map((district) => {
                  return (
                    <option key={district.val} value={district.name}>
                      {district.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>到期日</label>
            <div className="control-box">
              <DatePick
                isFullYYYY={false}
                name="expiry_date"
                handleDateChange={(v) => handleDateChange(v)}
              />
              <div className="expiry_date">{productLife}</div>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>店家資料</h3>
          <div className="form-group">
            <label>場館特色</label>
            <div className="control-box">
              {selection.features.map((f) => {
                return (
                  <label key={f.val} htmlFor={f.val}>
                    <input
                      type="checkbox"
                      id={f.val}
                      value={f.val}
                      name="features"
                      onChange={handleChange}
                    />
                    {f.name}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="block">
          <h3>其他費用</h3>
          <div className="form-group">
            <label>轉讓費</label>
            <div className="control-box">
              <input
                type="number"
                name="processing_fee"
                value={processing_fee}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="block">
          <h3>其他</h3>
          <div className="form-group">
            <label>備註</label>
            <div className="control-box">
              <input
                type="text"
                name="remark"
                value={remark}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="button-box">
          <button className="btn" onClick={() => backToList()}>
            取消
          </button>
          <button className="btn blue" onClick={() => done()}>
            完成
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRecord;
