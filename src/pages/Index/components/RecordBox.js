import "../scss/RecordBox.scss";
import selections from "../assets/selections.json";
import defaultBackground from "../assets/world_gym__1448962972_16f5e373.jpg";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

function RecordBox(props) {
  const { fitXs, handleClick } = props;
  const {
    title,
    store,
    gym_type,
    expiry_date,
    monthly_rental,
    modify_time,
    view = 0,
    remark,
  } = props.r;
  const selection = {
    gym_types: selections[0].list,
  };
  const yyyy_mm = () => {
    let d = new Date(expiry_date);
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    return yyyy + "/" + mm + "月";
  };
  const yyyy_mm_modify_time = () => {
    let d = new Date(modify_time);
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
        <p className="font-size-24">{title}</p>
        <p className="font-size-14">
          {gym_typeCaption()} {store}
        </p>
        <p id="remark" className="dark-gray-text font-size-14">
          {max30Chr(remark)}
        </p>
      </div>
      <div className="text-box-right">
        <p className="font-size-24">NT ${monthly_rental} / 月</p>
        <div>
          <p className="font-size-14">到期日期: {yyyy_mm()}</p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div>
          <p className="font-size-14">更新日期: {yyyy_mm_modify_time()}</p>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
      <div className="view-count font-size-14">
        <FontAwesomeIcon icon={regular("eye")} />
        &nbsp; {view}
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
    view: 0,
  },
};
RecordBox.propTypes = {
  handleClick: PropTypes.func,
  fitXs: PropTypes.bool,
  r: PropTypes.object,
};
export default RecordBox;
