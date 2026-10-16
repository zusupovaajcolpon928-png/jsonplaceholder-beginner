import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        {filteredComments.map((comment) => <Link className="card text-card card-link" to={`/comments/${comment.id}`} key={comment.id}><div className="card-top"><span className="tag">Comment</span><span className="id">ID: {comment.id}</span></div><h3>{comment.name}</h3><p>{comment.body}</p><p className="muted">{comment.email}</p><p className="muted">Post ID: {comment.postId}</p></Link>)}
      </div>}
    </section>
  );
}

export default Comments;
