import "../scss/Record.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import RecordBox from "./RecordBox";
import loadingGif from "../assets/loading.gif";
import basicRequest from "../../../apis/api";
import selections from "../assets/selections.json";
import zipcode from "../assets/twZipCode.json";

function Record() {
  const history = useHistory();
  const [recordCount, setRecordCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    nextUrl: null,
    previousUrl: null,
  });
  const [filter, setFilter] = useState({
    gym_type: null,
    county: null,
    district: null,
  });
  const [ordering, setOrdering] = useState({
    create_time: null,
    monthly_rental: null,
  });
  const [districts, setDistricts] = useState([]);
  // TODO expiry_date is a key feature, should be set as order
  const [records, setRecords] = useState([]);
  const selection = {
    zipcode,
    gym_types: selections[0].list,
  };
  const [search, setSearch] = useState("");

  useEffect(() => {
    readRecord();
    setSearch(history.location.search);
  }, []);

  useEffect(() => {
    let ret = [];
    let selectedDistricts = selection.zipcode.find(
      (item) => item.name === filter.county
    );

    if (selectedDistricts) {
      ret = selectedDistricts.districts;
    }
    setDistricts(ret);
  }, [filter.county]);

  const readRecord = (pager) => {
    if (pager === -1 && pagination.pageIndex === 1) {
      console.log("page index is 1");
      return;
    } else if (pager === 1 && pagination.nextUrl === null) {
      console.log("no next page");
      return;
    }

    setRecords([]);

    let url = getRecordUrl(pager);
    console.log(url);

    basicRequest.get(url).then((response) => {
      const { count, results, next, previous } = response.data;
      setRecordCount(count);
      setRecords(results);
      setPagination({
        pageIndex: pagination.pageIndex,
        nextUrl: next,
        previousUrl: previous,
      });

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };
  const getRecordUrl = (pager) => {
    let url = "/record/";

    // filter
    let urlSearch = new URLSearchParams();
    // pagination
    if (typeof pager === "number") {
      setPagination({
        pageIndex: (pagination.pageIndex += pager),
        nextUrl: pagination.nextUrl,
        previousUrl: pagination.previousUrl,
      });
      if (pagination.pageIndex !== 0) {
        urlSearch.set("page", pagination.pageIndex);
      }
    }

    // search
    if (search) {
      urlSearch.set("search", search);
    }

    // ordering
    let ordering = [];
    let orderingCreate_time = ordering.create_time;
    if (orderingCreate_time !== null) {
      ordering.push(orderingCreate_time + "create_time");
    }
    let orderingMonthly_rental = ordering.monthly_rental;
    if (orderingMonthly_rental !== null) {
      ordering.push(orderingMonthly_rental + "monthly_rental");
    }
    if (ordering.length > 0) {
      urlSearch.set("ordering", ordering);
    }

    let querys = urlSearch.toString();
    if (querys) {
      url += "?" + querys;
    }

    return url;
  };
  const checkout = (index) => {
    let record = records[index];
    sessionStorage.setItem("record", JSON.stringify(record));
    let id = record.id;
    history.push(`/recordDetail?recordId=${id}`);
  };

  function handleFilterChange(event) {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  }
  function handleSorterChange(event) {
    setOrdering({ ...ordering, [event.target.name]: event.target.value });
  }

  return (
    <div className="records">
      <div className="you-should-know">
        <p>健身會籍轉讓需知</p>
        <Router>
          <Link to="/notice">需要注意的事情</Link>
        </Router>
      </div>
      <div className="container">
        <div className="list-header">
          <div className="query-counter">
            <span id="record-count">筆數 {recordCount}</span>
          </div>
          <div className="query-fun">
            <select
              className="filter"
              name="gym_type"
              defaultValue={filter.gym_type}
              onChange={handleFilterChange}
            >
              <option value="">會籍</option>
              {selection.gym_types.map((item) => {
                return (
                  <option key={item.val} value={item.val}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <select
              className="filter"
              name="county"
              defaultValue={filter.county}
              onChange={handleFilterChange}
            >
              <option value="">縣市</option>
              {selection.zipcode.map((county) => {
                return (
                  <option key={county.name} value={county.name}>
                    {county.name}
                  </option>
                );
              })}
            </select>
            <select
              className="filter"
              name="district"
              defaultValue={filter.district}
              onChange={handleFilterChange}
            >
              <option value="">行政區</option>
              {districts.map((district) => {
                return (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                );
              })}
            </select>
            <select
              className="sorter"
              name="create_time"
              defaultValue={ordering.create_time}
              onChange={handleSorterChange}
            >
              <option value="" selected>
                建立日期
              </option>
              <option value="">新到舊</option>
              <option value>舊到新</option>
            </select>
            <select
              className="sorter"
              name="monthly_rental"
              defaultValue={ordering.monthly_rental}
              onChange={handleSorterChange}
            >
              <option value="" selected>
                月費
              </option>
              {/* TODO price(server side calculated) not monthly_rental */}
              <option value="-">高到低</option>
              <option value>低到高</option>
            </select>
          </div>
        </div>
        <div className="record-container">
          {records === null ? (
            <div>
              <img src={loadingGif} alt="loading" />
            </div>
          ) : null}

          {records.length === 0 ? (
            <div>無資料</div>
          ) : (
            records.map((r, i) => {
              return (
                <RecordBox key={r.id} r={r} handleClick={(o) => checkout(i)} />
              );
            })
          )}
          <div className="pagination-block">
            <button className="pagination-btn" onClick={(o) => readRecord(-1)}>
              上一頁
            </button>
            <button className="pagination-btn" onClick={(o) => readRecord(1)}>
              下一頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
