import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError("Не удалось загрузить публикации. Проверь интернет-соединение.");
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">GET /posts</p><h2>Posts — публикации</h2><p>Публикации и текст записей из API.</p></div><span className="count">{posts.length} записей</span></div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по заголовку..." />
      {loading && <p className="message">Загружаем публикации...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredPosts.map((post) => <Link className="card text-card card-link post-card" to={`/posts/${post.id}`} key={post.id}><div className="card-top"><span className="tag">Post</span><span className="id">ID: {post.id}</span></div><h3>{post.title}</h3><p>{post.body}</p><p className="muted">User ID: {post.userId}</p></Link>)}
      </div>}
    </section>
  );
}

export default Posts;
