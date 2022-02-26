import "../scss/Index.scss";
import { useState, useEffect } from "react";
import { HashRouter as Router, Link, useHistory } from "react-router-dom";
import RecordBox from "../components/RecordBox";
import basicRequest from "../../../apis/api";
import icon_featEasyContact from "../assets/feat-easy-contact.png";
import icon_featFree from "../assets/feat-free.png";
import icon_featClearInfo from "../assets/feat-clear-info.png";
import icon_featDiversityProd from "../assets/feat-diversity-prod.png";

function Index() {
  const history = useHistory();
  const [records, setRecords] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [countyScatter, setCountyScatter] = useState([]);

  useEffect(() => {
    readRecord();
    getRecordByCounty();
  }, []);
  function checkout(index) {
    let record = records[index];
    sessionStorage.setItem("record", JSON.stringify(record));
    let id = record.id;
    history.push(`/recordDetail?recordId=${id}`);
  }

  function readRecord() {
    setRecords([]);

    const isMobileWidth = window.innerWidth <= 480;
    let _page_size = isMobileWidth ? 7 : 15; // mobile show 7 items, pc 15 items
    let url = "/record/?page_size=" + _page_size;
    basicRequest.get(url).then((response) => {
      const { count, results } = response.data;
      setRecordCount(count);
      setRecords(results);
    });
  }
  function getRecordByCounty() {
    let url = "/group-by-county/";

    basicRequest.get(url).then((response) => {
      let list = response.data;
      list.splice(4, list.length);
      list.sort((a, b) => {
        return b.count - a.count;
      });
      setCountyScatter(list);
    });
  }

  return (
    <Router>
      <div className="index">
        <div className="slider-banner">
          <div className="background-area"></div>
          <div className="text-area">
            <p className="first-line">健身房會籍轉讓</p>
            <p className="second-line">
              有<span className="mark">{recordCount}</span>
              件刊登商品
            </p>
            <p>
              尋找你所在的城市
            </p>
            <div className="county-area">
              <ul className="circles">
                {countyScatter.map((item) => {
                  return (
                    <li key={item.county}>
                      <Link to={"/record?activeTab=" + item.county} className="area-btn">
                        {item.county}
                      </Link>
                      <p>{item.count}</p>
                      <p>件</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p>
              檢視
              <Link to="/record">全部商品</Link>
            </p>
          </div>
        </div>
        <div className="why-area">
          <p>為什麼我們要做 GymPool？</p>
          <p>我們能幫助你找到理想合約</p>
        </div>
        <div className="we-provide-them">
          <p>我們方便、簡單、好管理</p>
          <div>
            <ul>
              <li>
                <img src={icon_featEasyContact} alt="contactEasily" />
                <p>方便聯絡</p>
              </li>
              <li>
                <img src={icon_featFree} alt="free" />
                <p>完全免費</p>
              </li>
              <li>
                <img src={icon_featClearInfo} alt="clear" />
                <p>資訊透明</p>
              </li>
              <li>
                <img src={icon_featDiversityProd} alt="manyProduct" />
                <p>多樣商品</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="you-should-know">
          <p>健身會籍轉讓需知</p>
          <p>
            <Link to="/notice">需要注意的事情</Link>
          </p>
        </div>
        <div className="latest-sell">
          <p>最新上架</p>
          <div className="record-container">
            {records.map((r, i) => {
              return (
                <RecordBox
                  key={r.id}
                  className="record-box"
                  r={r}
                  fitXs={true}
                  handleClick={(o) => checkout(i)}
                />
              );
            })}
          </div>
          <div className="watch-more-block">
          看
            <Link router-link="true" className="watch-more" to="/record">
              更多選項
            </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Index;
