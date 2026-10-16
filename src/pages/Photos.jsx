import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPhotos() {
      try {
        
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=30");
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        setError("Не удалось загрузить фотографии. Проверь интернет-соединение.");
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, []);

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">GET /photos</p><h2>Photos — фотографии</h2><p>Первые 30 фотографий из API.</p></div><span className="count">{photos.length} записей</span></div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по названию фотографии..." />
      {loading && <p className="message">Загружаем фотографии...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredPhotos.map((photo) => <Link className="card photo-card card-link" to={`/photos/${photo.id}`} key={photo.id}><img src={photo.thumbnailUrl} alt={photo.title} loading="lazy"/><div><div className="card-top"><span className="tag">Photo</span><span className="id">ID: {photo.id}</span></div><h3>{photo.title}</h3><p className="muted">Album ID: {photo.albumId}</p></div></Link>)}
      </div>}
    </section>
  );
}

export default Photos;
