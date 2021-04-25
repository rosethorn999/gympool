import "../scss/DatePick.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
function DatePick(props) {
  const [yyyy, setYYYY] = useState(-999);
  const [mm, setMM] = useState(-999);
  const [dd, setDD] = useState(-999);
  const [selection, setSelection] = useState({
    yyyy: [],
    mm: [],
    dd: [],
  });

  useEffect(() => {
    const v = [yyyy, mm, dd].join("-");

    props.handleDateChange && props.handleDateChange(v);
  }, [yyyy, mm, dd]);

  useEffect(() => {
    let today = new Date();
    let yyyy = today.getFullYear();

    const ret = { yyyy: [], mm: [], dd: [] };
    if (props.isFullYYYY) {
      for (let i = 0; i < 70; i++) {
        let v = (yyyy - i).toString();
        ret.yyyy.push(v);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        let v = (yyyy + i).toString();
        ret.yyyy.push(v);
      }
    }
    for (let i = 1; i <= 12; i++) {
      let v = paddingLeft(i.toString(), 2);
      ret.mm.push(v);
    }
    for (let i = 1; i <= 31; i++) {
      let v = paddingLeft(i.toString(), 2);
      ret.dd.push(v);
    }

    setSelection(ret);
  }, []);
  function paddingLeft(str, length) {
    if (str.length >= length) return str;
    else return paddingLeft("0" + str, length);
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "yyyy":
        setYYYY(event.target.value.trim());
        break;
      case "mm":
        setMM(event.target.value.trim());
        break;
      case "dd":
        setDD(event.target.value.trim());
        break;
      default:
        break;
    }
  }
  return (
    <div className="DatePick">
      <div>
        <select className="yyyy" name="yyyy" onChange={handleChange}>
          <option value="-999" disabled>
            年份
          </option>
          {selection.yyyy.map((yyyy) => (
            <option key={yyyy} value={yyyy}>
              {yyyy}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select className="mm" name="mm" onChange={handleChange}>
          <option value="-999" disabled>
            月份
          </option>
          {selection.mm.map((mm) => {
            return (
              <option key={mm} value={mm}>
                {mm}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select className="dd" name="dd" onChange={handleChange}>
          <option value="-999" disabled>
            日期
          </option>
          {selection.dd.map((dd) => (
            <option key={dd} value={dd}>
              {dd}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

DatePick.defaultProps = {
  isFullYYYY: false,
};
DatePick.propTypes = {
  isFullYYYY: PropTypes.bool,
  handleDateChange: PropTypes.func,
};
export default DatePick;
