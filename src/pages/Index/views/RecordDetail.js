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
      <div className="you-should-know">
        <p>健身會籍轉讓需知</p>
        <p>
          <Router>
            <Link to="/notice">需要注意的事情</Link>
          </Router>
        </p>
      </div>
      <div className="container">
        <div className="controller" onClick={goBack}>
          &larr; 回上一頁
        </div>
        <div className="record-container">
          <div className="upper-box">
            <div className="left-box">
              <img className="main-image" src="https://via.placeholder.com/583x334" alt="mainPic" />
              <div className="img-box">
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
                <img src="https://via.placeholder.com/105x60" alt="img" />
              </div>
              <div className="tag-box">
                <a href="#/">#tag</a>
                <a href="#/">#tag</a>
                <a href="#/">#tag</a>
                <a href="#/">#tag</a>
                <a href="#/">#tag</a>
                <a href="#/">#tag</a>
              </div>
            </div>
            <div className="right-box">
              {inventory <= 0 && <p>已售出</p>}
              <h1>{title}</h1>
              <h3>
                {gym_typeCaption(gym_type)} {store}
              </h3>
              <h4>到期日: {expiry_date}</h4>
              <p>&nbsp;</p>
              <p>建立日期: {create_time}</p>
              <p>
                所在地: {county}
                {district}
              </p>
              <p>
                場館特色:{" "}
                {selection.features.map(
                  (o) =>
                    features.some((f) => f === o.val) && (
                      <span key={o.val}>{o.name} </span>
                    )
                )}
              </p>
              <p>賣家資訊: {creator}</p>
              <h3>&nbsp;</h3>
              <h1>
                價格 : <span className="blue">NT ${price()}</span>
              </h1>
              <h3 className="gray">月費: ${monthly_rental}/月</h3>
              <h3 className="gray">轉讓費: ${processing_fee}</h3>
              <div className="contacts-box">
                <img src="https://via.placeholder.com/50" alt="img" />
                <img src="https://via.placeholder.com/50" alt="img" />
                <img src="https://via.placeholder.com/50" alt="img" />
              </div>
            </div>
          </div>

          <div className="bottom-box">
            <div className="header">備註</div>
            <div className="remark">{remark}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordDetail;
