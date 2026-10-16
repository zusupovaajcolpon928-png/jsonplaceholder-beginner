import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const resourceNames = {
  users: "пользователя",
  posts: "публикацию",
  comments: "комментарий",
  todos: "задачу",
  albums: "альбом",
  photos: "фотографию",
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Запрос завершился с ошибкой (${response.status}).`);
  }
  return response.json();
}

function RelatedLinks({ title, items, resource, getLabel }) {
  return (
    <section className="related-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="muted">Связанных записей нет.</p>
      ) : (
        <ul className="related-list">
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/${resource}/${item.id}`}>
                <span>{getLabel(item)}</span>
                <span className="id">ID: {item.id}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Details() {
  const { resource, id } = useParams();
  const [record, setRecord] = useState(null);
  const [related, setRelated] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const resourceName = resourceNames[resource];

  useEffect(() => {
    let isCurrent = true;

    async function loadDetails() {
      setLoading(true);
      setError("");
      setRecord(null);
      setRelated({});

      try {
        if (!resourceName) {
          throw new Error("Такой раздел не найден.");
        }

        const item = await fetchJson(`https://jsonplaceholder.typicode.com/${resource}/${id}`);
        if (item === null || Array.isArray(item)) {
          throw new Error(`Запрошенный ${resourceName} не найден.`);
        }
        if (!isCurrent) return;
        setRecord(item);

        let relatedData = {};
        if (resource === "users") {
          const [posts, todos] = await Promise.all([
            fetchJson(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
            fetchJson(`https://jsonplaceholder.typicode.com/todos?userId=${id}`),
          ]);
          relatedData = { posts, todos };
        } else if (resource === "posts") {
          relatedData = {
            comments: await fetchJson(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
          };
        } else if (resource === "albums") {
          relatedData = {
            photos: await fetchJson(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`),
          };
        }

        if (isCurrent) setRelated(relatedData);
      } catch (loadError) {
        if (isCurrent) setError(loadError.message || "Не удалось загрузить данные.");
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadDetails();
    return () => {
      isCurrent = false;
    };
  }, [resource, id, resourceName]);

  if (loading) return <p className="message">Загружаем подробную информацию...</p>;

  if (error) {
    return (
      <section>
        <Link className="back-link" to={`/${resource}`}>← Назад</Link>
        <p className="message error">{error}</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <Link className="back-link" to={`/${resource}`}>← Назад к списку</Link>

      {resource === "users" && (
        <>
          <div className="detail-panel">
            <p className="eyebrow">USER · ID {record.id}</p>
            <h2>{record.name}</h2>
            <p className="muted">@{record.username}</p>
            <dl className="detail-fields">
              <div><dt>Email</dt><dd><a href={`mailto:${record.email}`}>{record.email}</a></dd></div>
              <div><dt>Телефон</dt><dd>{record.phone}</dd></div>
              <div><dt>Сайт</dt><dd><a href={`https://${record.website}`} target="_blank" rel="noreferrer">{record.website}</a></dd></div>
              <div><dt>Адрес</dt><dd>{record.address.street}, {record.address.suite}, {record.address.city}, {record.address.zipcode}</dd></div>
              <div><dt>Компания</dt><dd>{record.company.name}<br />{record.company.catchPhrase}<br />{record.company.bs}</dd></div>
            </dl>
          </div>
          <RelatedLinks title="Публикации пользователя" items={related.posts || []} resource="posts" getLabel={(post) => post.title} />
          <RelatedLinks title="Задачи пользователя" items={related.todos || []} resource="todos" getLabel={(todo) => todo.title} />
        </>
      )}

      {resource === "posts" && (
        <>
          <div className="detail-panel">
            <p className="eyebrow">POST · ID {record.id}</p>
            <h2>{record.title}</h2>
            <p className="detail-body">{record.body}</p>
            <p className="muted">User ID: {record.userId}</p>
          </div>
          <RelatedLinks title="Комментарии" items={related.comments || []} resource="comments" getLabel={(comment) => comment.name} />
        </>
      )}

      {resource === "comments" && (
        <div className="detail-panel">
          <p className="eyebrow">COMMENT · ID {record.id}</p>
          <h2>{record.name}</h2>
          <p><a href={`mailto:${record.email}`}>{record.email}</a></p>
          <p className="detail-body">{record.body}</p>
          <p>Post ID: <Link to={`/posts/${record.postId}`}>{record.postId}</Link></p>
        </div>
      )}

      {resource === "todos" && (
        <div className="detail-panel">
          <p className="eyebrow">TODO · ID {record.id}</p>
          <h2>{record.title}</h2>
          <p>User ID: <Link to={`/users/${record.userId}`}>{record.userId}</Link></p>
          <span className={record.completed ? "status done" : "status pending"}>
            {record.completed ? "Completed" : "Not completed"}
          </span>
        </div>
      )}

      {resource === "albums" && (
        <>
          <div className="detail-panel">
            <p className="eyebrow">ALBUM · ID {record.id}</p>
            <h2>{record.title}</h2>
            <p>User ID: <Link to={`/users/${record.userId}`}>{record.userId}</Link></p>
          </div>
          <section className="related-section">
            <h3>Фотографии альбома</h3>
            {related.photos?.length ? (
              <div className="cards">
                {related.photos.map((photo) => (
                  <Link className="card photo-card card-link" to={`/photos/${photo.id}`} key={photo.id}>
                    <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
                    <div><div className="card-top"><span className="tag">Photo</span><span className="id">ID: {photo.id}</span></div><h3>{photo.title}</h3></div>
                  </Link>
                ))}
              </div>
            ) : <p className="muted">Фотографий в альбоме нет.</p>}
          </section>
        </>
      )}

      {resource === "photos" && (
        <div className="detail-panel">
          <p className="eyebrow">PHOTO · ID {record.id}</p>
          <h2>{record.title}</h2>
          <p>Album ID: <Link to={`/albums/${record.albumId}`}>{record.albumId}</Link></p>
          <div className="photo-detail-images">
            <figure><img src={record.thumbnailUrl} alt={`${record.title} миниатюра`} /><figcaption>Миниатюра</figcaption></figure>
            <figure><a href={record.url} target="_blank" rel="noreferrer"><img src={record.url} alt={record.title} /></a><figcaption>Полноразмерное изображение</figcaption></figure>
          </div>
        </div>
      )}
    </section>
  );
}

export default Details;