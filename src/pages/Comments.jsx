import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError;
      } finally {
        setLoading(false);
      }
    }

    getComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    comment.name.toLowerCase().includes(search.toLowerCase()) ||
    comment.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">GET /comments</p><h2>Comments — комментарии</h2><p>Комментарии к публикациям.</p></div><span className="count">{comments.length} записей</span></div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по заголовку или email..." />
      {loading && <p className="message">Загружаем комментарии...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredComments.map((comment) => <Link className="card card-link comment-card" to={`/comments/${comment.id}`} key={comment.id}>
          <div className="comment-card-head"><span className="comment-quote" aria-hidden="true">“</span><span className="comment-number">COMMENT #{comment.id}</span></div>
          <h3>{comment.name}</h3>
          <p className="comment-body">{comment.body}</p>
          <div className="comment-footer"><span className="comment-author">{comment.email}</span><span className="comment-post">POST #{comment.postId}</span></div>
        </Link>)}
      </div>}
    </section>
  );
}

export default Comments;
