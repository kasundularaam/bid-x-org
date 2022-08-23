import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import ActiveStock from "../components/ActiveStock";
import EndedStock from "../components/EndedStock";
import NewStock from "../components/NewStock";
const Home = ({ user }) => {
  const newsUrl = `http://localhost:8000/api/v1/news/org/${user._id}`;
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);
  const [stockState, setStockState] = useState(0);
  const loadNews = async () => {
    try {
      const { data } = await axios.get(newsUrl);
      setNews(data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    loadNews();
  }, []);
  return (
    <>
      {error && <div className="errorBar">{error}</div>}
      <section>
        <div className="orgHeader">
          <div className="left">
            <img src={user.logo} alt={user.name} />
            <h4>{user.name}</h4>
          </div>
          <div className="right">
            <small>Subscribe to news later</small>
          </div>
        </div>
      </section>
      <div className="stock">
        {stockState === 0 && (
          <ActiveStock orgId={user._id} setStockState={setStockState} />
        )}
        {stockState === 1 && (
          <EndedStock orgId={user._id} setStockState={setStockState} />
        )}
        {stockState === 2 && (
          <NewStock setStockState={setStockState} orgId={user._id} />
        )}
      </div>
      <section className="newsSection">
        <div className="rowContainer">
          <h4>News</h4>
          <div className="Row">
            {news.map((singleNews) => {
              return <NewsCard key={singleNews._id} news={singleNews} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
