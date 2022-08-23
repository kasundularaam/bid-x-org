import axios from "axios";
import { useState } from "react";

const NewNews = ({ orgId }) => {
  const url = "http://localhost:8000/api/v1/news";
  const [title, setTitle] = useState("");
  const [news, setNews] = useState("");

  const [error, setError] = useState("");

  const publishNews = async () => {
    try {
      if (news && title) {
        const now = new Date().getTime();
        const { data } = await axios.post(url, {
          title: title,
          timeStamp: now,
          news: news,
          orgId: orgId,
        });
        setNews("");
        setTitle("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="newNews">
      <div className="Input">
        <input
          type="text"
          id="title"
          className="Input-text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="input" className="Input-label">
          Title
        </label>
      </div>

      <div className="Input">
        <textarea
          type="text"
          rows={10}
          id="news"
          className="Input-text"
          placeholder="News"
          value={news}
          onChange={(e) => setNews(e.target.value)}
        />
      </div>

      <button type="submit" className="btn" onClick={publishNews}>
        Publish
      </button>
    </section>
  );
};

export default NewNews;
