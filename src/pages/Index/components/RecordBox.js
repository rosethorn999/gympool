import "../scss/RecordBox.scss";
import selections from "../assets/selections.json";
import defaultBackground from "../assets/world_gym__1448962972_16f5e373.jpg";
import PropTypes from "prop-types";

function RecordBox(props) {
  const { fitXs, handleClick } = props;
  const {
    title,
    store,
    gym_type,
    expiry_date,
    monthly_rental,
    processing_fee,
    remark,
  } = props.r;
  const selection = {
    gym_types: selections[0].list,
  };
  const price = () => {
    let d = new Date(expiry_date).getTime();
    let now = new Date().getTime();

    const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
    return monthly_rental * monthCount + processing_fee;
  };
  const yyyy_mm = () => {
    let d = new Date(expiry_date);
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    return yyyy + "/" + mm + "月";
  };
  const gym_typeCaption = () => {
    let v = gym_type;
    let selected = selection.gym_types.filter(function (item) {
      return item.val === v;
    });
    if (selected.length > 0) {
      return selected[0].name;
    } else {
      return "無法計算";
    }
  };
  const max30Chr = (v) => {
    if (v && v.length > 27) {
      return v.substr(0, 27) + "...";
    }
    return v;
  };

  return (
    <div className={`record-box ${fitXs ? "xs" : ""}`} onClick={handleClick}>
      <div className="image-block">
        <img src={defaultBackground} alt="wg" />
      </div>
      <div className="text-box-left">
        <p className="font-size-20">{title}</p>
        <p className="font-size-18">
          {gym_typeCaption()} {store}
        </p>
        <p className="dark-gray-text font-size-14">{max30Chr(remark)}</p>
      </div>
      <div className="text-box-right">
        <p className="gray-text font-size-20">轉讓費: ${processing_fee}</p>
        <p className="gray-text font-size-20">月費: ${monthly_rental}/月</p>
        <div>
          <p id="price" className="blue-text font-size-24">
            NT ${price()}
          </p>
          <p id="expiry_date" className="gray-text font-size-20">
            到期日: {yyyy_mm()}
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </div>
  );
}

RecordBox.defaultProps = {
  fitXs: false,
  r: {
    title: "",
    store: "",
    gym_type: 1,
    expiry_date: "",
    monthly_rental: "",
    processing_fee: "",
    remark: "",
  },
};
RecordBox.propTypes = {
  handleClick: PropTypes.func,
  fitXs: PropTypes.bool,
  r: PropTypes.object,
};
export default RecordBox;
