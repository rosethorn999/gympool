import "../scss/Index.scss";
import { useState, useEffect } from "react";
import { HashRouter as Router, useHistory } from "react-router-dom";
import basicRequest from "../../../apis/api";
import Swal from "sweetalert2";
import selections from "../assets/selections.json";
import store from "../store/index";
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
  const [searchText, setSearchText] = useState("");
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
    if (searchText) {
      urlSearch.set("search", searchText);
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
    searchText,
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
    searchText,
    user,
  ]);
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
      title: "確定嗎?",
      text: "此動作將無法回復",
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
            Swal.fire("完成", "此商品已經被刪除了", "success").then(() => {
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
      return "無法計算";
    }
  }
  function handleChange(event) {
    switch (event.target.name) {
      case "search":
        setSearchText(event.target.value.trim());
        search();
        break;
      default:
        break;
    }
  }
  function search(t) {
    // TODO: event
  }

  return (
    <Router>
      <div className="home">
        <button className="add-record" onClick={() => addRecord()}>
          &#43;
        </button>
        <div className="search-bar">
          <input type="text" name="search" onChange={handleChange}></input>
          <button type="button" className="search-button">
            | 🔍
          </button>
        </div>
        <div className="list-header">
          <div>
            <span id="recordCount">筆數 {recordCount}</span>
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
                建立日期
              </option>
              <option value="null">新到舊</option>
              <option value>舊到新</option>
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
                月費
              </option>
              {/* TODO price(server side calculated) not monthly_rental */}
              <option value="-">高到低</option>
              <option value="">低到高</option>
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
                      {r.inventory <= 0 && <p>已售出</p>}
                      <img src={world_gym__1448962972_16f5e373} alt="pic" />
                    </div>
                    <div className="msg-block">
                      <div className="price-block">
                        <span className="blue-text">NT{getPrice(r)}</span>
                      </div>
                      <div className="detail-block">
                        <span>到期日: {r.expiry_date}</span>
                        <br />
                        <span>
                          轉讓費: {r.processing_fee}元&nbsp;&nbsp;&nbsp;&nbsp;{r.monthly_rental} /
                          月
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="title-block">
                    <h1>{r.title}</h1>
                    <h2>{gym_typeCaption(r.gym_type, r.store)}</h2>
                  </div>
                  <div className="buttons">
                    <button className="edit-button" onClick={() => checkout(i)}>
                      修改
                    </button>
                    <button className="remove-button" onClick={() => remove(i)}>
                      刪除
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <img src={loading} alt="loading" />
          )}
          {records && records.length === 0 && <li>無資料</li>}
        </ul>
        <div className="pagination">
          <span>目前頁數 {pagination.pageIndex}</span>
          &nbsp;|&nbsp;
          <span onClick={() => setCurrentPage(currentPage - 1)}>上一頁</span>
          &nbsp;|&nbsp;
          <span onClick={() => setCurrentPage(currentPage + 1)}>下一頁</span>
        </div>
      </div>
    </Router>
  );
}

export default Index;
