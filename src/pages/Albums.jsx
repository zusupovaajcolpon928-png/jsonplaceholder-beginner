import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAlbums() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/albums");
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        setError("Не удалось загрузить альбомы. Проверь интернет-соединение.");
      } finally {
        setLoading(false);
      }
    }

    getAlbums();
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">GET /albums</p><h2>Albums — альбомы</h2><p>Альбомы, в которых хранятся фотографии.</p></div><span className="count">{albums.length} записей</span></div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по названию альбома..." />
      {loading && <p className="message">Загружаем альбомы...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredAlbums.map((album) => <Link className="card card-link" to={`/albums/${album.id}`} key={album.id}><div className="card-top"><span className="tag">Album</span><span className="id">ID: {album.id}</span></div><h3>{album.title}</h3><p className="muted">User ID: {album.userId}</p></Link>)}
      </div>}
    </section>
  );
}

export default Albums;
