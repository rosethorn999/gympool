import "../scss/Index.scss";
import { useState, useEffect } from "react";
import { HashRouter as Router, useHistory } from "react-router-dom";
import basicRequest from "../../../apis/api";
import Swal from "sweetalert2";
import selections from "../assets/selections.json";
import store from "../store/index";
import more from "../assets/more.png";
import loading from "../assets/loading.gif";
import world_gym__1448962972_16f5e373 from "../assets/world_gym__1448962972_16f5e373.jpg";

function Index() {
  const baseRecordUrl = "/record/";
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(null);
  const [records, setRecords] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [ordering, setOrdering] = useState({
    create_time: null,
    monthly_rental: null,
  });
  const [pagination, setPagination] = useState({
    pageIndex: null,
    nextUrl: null,
    previousUrl: null,
  });
  const [selection] = useState({
    gym_types: selections[0].list,
  });
  const user = store.getState().user.user;
  const [search, setSearch] = useState("");
  const [showMenuIndex, setShowMenuIndex] = useState(-1);
  const [fetchRecordUrl, setFetchRecordUrl] = useState(baseRecordUrl);

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    let url = baseRecordUrl;

    // filter
    let urlSearch = new URLSearchParams();
    if (user) {
      let creator = user._id;
      urlSearch.set("creator", creator);
    }

    // pagination
    if (typeof pager === "number") {
      if (currentPage !== 0) {
        urlSearch.set("page", currentPage);
      }
    }
    // search
    if (search) {
      urlSearch.set("search", search);
    }

    // ordering
    let orderingArr = [];
    let orderingCreate_time = ordering.create_time;
    if (orderingCreate_time !== null) {
      orderingArr.push(orderingCreate_time + "create_time");
    }
    let orderingMonthly_rental = ordering.monthly_rental;
    if (orderingMonthly_rental !== null) {
      orderingArr.push(orderingMonthly_rental + "monthly_rental");
    }
    if (orderingArr.length > 0) {
      urlSearch.set("ordering", orderingArr);
    }

    let queries = urlSearch.toString();
    if (queries) {
      url += "?" + queries;
    }

    setFetchRecordUrl(url);
  }, [
    currentPage,
    ordering.create_time,
    ordering.monthly_rental,
    pagination.pageIndex,
    search,
    user,
  ]);

  useEffect(() => {
    function readRecord() {
      if (pagination.pageIndex === 1) {
        console.log("page index is 1");
        return;
      } else if (pagination.pageIndex !== null && pagination.nextUrl === null) {
        console.log("no next page");
        return;
      }

      setRecords([]);

      basicRequest.get(fetchRecordUrl).then((response) => {
        const { count, results, next, previous } = response.data;
        setRecordCount(count);
        setRecords(results);
        setPagination({ nextUrl: next, previousUrl: previous });
      });
    }

    readRecord();
  }, [
    currentPage,
    fetchRecordUrl,
    ordering,
    pagination.nextUrl,
    pagination.pageIndex,
    search,
    user,
  ]);

  const max30Chr = (v) => {
    if (v && v.length > 27) {
      return v.substr(0, 27) + "...";
    }
    return v;
  };

  function triggerMenu(index) {
    setShowMenuIndex(index);
    closeAllDropDownMenu();
  }

  function addRecord() {
    history.push(`/addRecord`);
  }
  function checkout(index) {
    let record = records[index];
    localStorage.setItem("record", JSON.stringify(record));
    history.push(`/record?recordId=${record.id}`);
  }
  function remove(index) {
    // Check
    Swal.fire({
      title: "??????????",
      text: "????????????????????????",
      showCancelButton: true,
      type: "warning",
    }).then((result) => {
      if (result.value) {
        // Press Yes
        let record = records[index];
        let url = "/record/" + record.id + "/";

        // Delete
        basicRequest
          .delete(url)
          .then(() => {
            Swal.fire("??????", "???????????????????????????", "success").then(() => {
              setCurrentPage(0); // Refresh records
            });
          })
          .catch(function (error) {
            const title = error.response.status.toString();
            const msg = JSON.stringify(error.response.data);
            Swal.fire(title, msg, "error");
            console.error(error);
          });
      }
    });
  }
  function getPrice(r) {
    let d = new Date(r.expiry_date).getTime();
    let now = new Date().getTime();

    const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
    return r.monthly_rental * monthCount + r.processing_fee;
  }
  function gym_typeCaption(v) {
    let selected = selection.gym_types.filter(function (item) {
      return item.val === v;
    });
    if (selected.length > 0) {
      return selected[0].name;
    } else {
      return "????????????";
    }
  }
  function closeAllDropDownMenu() {
    setTimeout(() => {
      setShowMenuIndex(-1);
    }, 2000);
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "search":
        setSearch(event.target.value.trim());
        break;
      default:
        break;
    }
  }

  return (
    <Router>
      <div className="home">
        <button className="add-record" onClick={() => addRecord()}>
          &#43;
        </button>

        <div className="search-bar">
          {/* TODO magnifier icon  */}
          <input
            type="text"
            name="search"
            placeholder="??????"
            value={search}
            onChange={handleChange}
          />
          <button
            className="btn blue"
            onClick={() => setCurrentPage(currentPage)}
          >
            ??????
          </button>
        </div>
        <div className="list-header">
          <div>
            <h2 id="recordCount">?????? {recordCount}</h2>
          </div>
          <div>
            <select
              className="sorter"
              onChange={(event) => {
                setOrdering({
                  ...ordering,
                  create_time: event.target.value,
                });
              }}
            >
              <option value="null" disabled>
                ????????????
              </option>
              <option value="null">?????????</option>
              <option value>?????????</option>
            </select>
            <select
              className="sorter"
              onChange={(event) => {
                setOrdering({
                  ...ordering,
                  monthly_rental: event.target.value,
                });
              }}
            >
              <option value="null" disabled>
                ??????
              </option>
              {/* TODO price(server side calculated) not monthly_rental */}
              <option value="-">?????????</option>
              <option value="">?????????</option>
            </select>
          </div>
        </div>

        <ul>
          {records ? (
            records.map((r, i) => {
              return (
                <li className="list-item" key={r.id}>
                  <div className="image-block">
                    <div className="image-box">
                      {r.inventory <= 0 && <p>?????????</p>}
                      <img src={world_gym__1448962972_16f5e373} alt="pic" />
                    </div>
                  </div>
                  <div className="title-block">
                    <p>{r.title}</p>
                    <p>{gym_typeCaption(r.gym_type, r.store)}</p>
                    <p>{max30Chr(r.remark)}</p>
                  </div>
                  <div className="price-block">
                    <p className="blue-text">NT{getPrice(r)}</p>
                  </div>
                  <div className="detail-block">
                    <p>?????????: {r.processing_fee}</p>
                    <p>??????: {r.monthly_rental} / ???</p>
                    <p>?????????: {r.expiry_date}</p>
                  </div>
                  <div className="more-block">
                    <img
                      className="more"
                      src={more}
                      onClick={() => triggerMenu(i)}
                      alt="more"
                    />
                    {showMenuIndex === i && (
                      <div className="dropdown-menu show">
                        {/* TODO triangle */}
                        <button
                          className="dropdown-item"
                          onClick={() => checkout(i)}
                        >
                          ??????
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => remove(i)}
                        >
                          ??????
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <img src={loading} alt="loading" />
          )}
          {records && records.length === 0 && <li>?????????</li>}
        </ul>
        <div className="pagination">
          <span>???????????? {pagination.pageIndex}</span>
          &nbsp;|&nbsp;
          <span onClick={() => setCurrentPage(currentPage - 1)}>?????????</span>
          &nbsp;|&nbsp;
          <span onClick={() => setCurrentPage(currentPage + 1)}>?????????</span>
        </div>
      </div>
    </Router>
  );
}

export default Index;
