import "../scss/RecordDetail.scss";
import selections from "../assets/selections.json";
import { HashRouter as Router, Link, useHistory } from "react-router-dom";

function RecordDetail() {
  const history = useHistory();

  let record = sessionStorage.getItem("record") ? JSON.parse(sessionStorage.getItem("record")) : {};
  const {
    title,
    gym_type,
    store,
    monthly_rental,
    county,
    district,
    expiry_date,
    remark,
    features,
    processing_fee,
    create_time,
    creator,
    inventory,
  } = record;
  const selection = {
    gym_types: selections[0].list,
    features: selections[1].list,
  };
  const price = () => {
    let d = new Date(expiry_date).getTime();
    let now = new Date().getTime();

    const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
    return monthly_rental * monthCount + processing_fee;
  };
  const goBack = () => {
    history.goBack();
  };
  const gym_typeCaption = (v) => {
    let selected = selection.gym_types.filter(function (item) {
      return item.val === v;
    });
    if (selected.length > 0) {
      return selected[0].name;
    } else {
      return "無法計算";
    }
  };
  return (
    <div className="recordDetail">
      <div className="container">
        <div className="controller" onClick={goBack}>
          &larr; 回上一頁
        </div>
        <div className="record-container">
          <div className="upper-box">
            <div className="left-box">
            <h1>{title}</h1>
            <span>{inventory <= 0 && <p>已售出</p>}</span>
              <img className="main-image" src="https://via.placeholder.com/583x334" alt="mainPic" />
              <div className="contacts-box">
                <h3>聯絡資訊</h3>
                <p>賣家資訊: {creator}</p>

                <img src="https://via.placeholder.com/50" alt="img" />
                <img src="https://via.placeholder.com/50" alt="img" />
                <img src="https://via.placeholder.com/50" alt="img" />
              </div>
            </div>
            <div className="right-box">
              <h5>
                店名
              </h5>
              <h3>
                {gym_typeCaption(gym_type)} {store}
              </h3>
              <p>
                {county}
                {district}
              </p>

              <div className="record-date-block">
              <h5>
              合約到期日
              </h5>
              <h4> {expiry_date}</h4>
              <p>建立日期: {create_time}</p>

              </div>

              {/* <p>
                場館特色:{" "}
                {selection.features.map(
                  (o) =>
                    features.some((f) => f === o.val) && (
                      <span key={o.val}>{o.name} </span>
                    )
                )}
              </p> */}
              <div className="record-price">
              <h5>
                價格
              </h5>
              <h6  className="blue">NT ${price()}</h6>
              <p className="gray">月費: ${monthly_rental}/月</p>
              <p className="gray">轉讓費: ${processing_fee}</p>

              <div className="bottom-box">
            <div className="header">備註</div>
            <div className="remark">{remark}</div>
          </div>

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default RecordDetail;
