import "../scss/Record.scss";
import React from "react";
import { useState, useEffect } from "react";
import { HashRouter as Router, Link, useHistory, useLocation } from "react-router-dom";
import RecordBox from "../components/RecordBox";
import loadingGif from "../assets/loading.gif";
import basicRequest from "../../../apis/api";
import selections from "../assets/selections.json";
import zipCode from "../assets/twZipCode.json";

function Record() {
  const baseRecordUrl = "/record/";
  const municipalities = ["臺北", "新北", "臺中", "臺南", "高雄"];
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
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
    zipCode,
    gym_types: selections[0].list,
  };
  const [searchBarText] = useState("");
  const [fetchRecordUrl, setFetchRecordUrl] = useState(baseRecordUrl);
  const [activeTab, setActiveTab] = useState("全部");
  let query = useQuery();

  useEffect(() => {
    const activeTabValue = query.get("activeTab")?.substr(0, 2);
    if (municipalities.includes(activeTabValue)) {
      setActiveTab(activeTabValue);
    }
    readRecord();
  }, []);

  useEffect(() => {
    readRecord();
  }, [fetchRecordUrl]);

  useEffect(() => {
    readRecord();
  }, [currentPage]);

  useEffect(() => {
    prepareFetchUrl();
  }, [currentPage, pagination.pageIndex, searchBarText, activeTab]);
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  function prepareFetchUrl() {
    let url = baseRecordUrl;
    let urlSearch = new URLSearchParams();

    // filter
    if (activeTab !== "全部") {
      urlSearch.set("county", activeTab + "市");
    }

    // pagination
    if (typeof currentPage === "number") {
      if (pagination.pageIndex !== 0) {
        urlSearch.set("page", pagination.pageIndex);
      }
    }

    // searchBarText
    if (searchBarText) {
      urlSearch.set("search", searchBarText);
    }

    // ordering
    let tempOrdering = [];
    let orderingCreate_time = ordering.create_time;
    if (orderingCreate_time !== null) {
      tempOrdering.push(orderingCreate_time + "create_time");
    }
    let orderingMonthly_rental = ordering.monthly_rental;
    if (orderingMonthly_rental !== null) {
      tempOrdering.push(orderingMonthly_rental + "monthly_rental");
    }
    if (ordering.length > 0) {
      urlSearch.set("ordering", tempOrdering);
    }

    let queries = urlSearch.toString();
    if (queries) {
      url += "?" + queries;
    }

    setFetchRecordUrl(url);
  }

  useEffect(() => {
    let ret = [];
    let selectedDistricts = selection.zipCode.find((item) => item.name === filter.county);

    if (selectedDistricts) {
      ret = selectedDistricts.districts;
    }
    setDistricts(ret);
  }, [filter.county, selection.zipCode]);

  function readRecord() {
    if (currentPage === -1 && pagination.pageIndex === 1) {
      console.log("page index is 1");
      return;
    } else if (currentPage === 1 && pagination.nextUrl === null) {
      console.log("no next page");
      return;
    }

    basicRequest.get(fetchRecordUrl).then((response) => {
      const { results, next, previous } = response.data;
      setRecords(results);
      setPagination({
        pageIndex: pagination.pageIndex,
        nextUrl: next,
        previousUrl: previous,
      });

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  function checkout(index) {
    let record = records[index];
    sessionStorage.setItem("record", JSON.stringify(record));
    let id = record.id;
    history.push(`/recordDetail?recordId=${id}`);
  }

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
          <div className="search-bar">
            <input type="text"></input>
            <button
              type="button"
              className="search-button"
              onClick={() => console.log("search button clicked")}
            >
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="query-fun">
            <select className="country-tab-container">
              {["全部區", ...municipalities].map((o, i) => {
                return (
                  <option
                    key={o}
                    className={`country-tab ${activeTab === o ? "active" : ""}`}
                    onClick={() => setActiveTab(o)}
                  >
                    {o}
                  </option>
                );
              })}
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
              return <RecordBox key={r.id} r={r} handleClick={(o) => checkout(i)} />;
            })
          )}
          <div className="pagination-block">
            <button className="pagination-btn" onClick={() => setCurrentPage(currentPage - 1)}>
              上一頁
            </button>
            <button className="pagination-btn" onClick={() => setCurrentPage(currentPage + 1)}>
              下一頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
