import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Не удалось загрузить пользователей. Проверь интернет-соединение.");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">GET /users</p><h2>Users — пользователи</h2><p>Информация о пользователях, полученная из API.</p></div>
        <span className="count">{users.length} записей</span>
      </div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по имени или email..." />
      {loading && <p className="message">Загружаем пользователей...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredUsers.map((user) => (
          <Link className="card card-link user-card" to={`/users/${user.id}`} key={user.id}>
            <div className="card-top"><span className="avatar">{user.name[0]}</span><span className="id">ID: {user.id}</span></div>
            <h3>{user.name}</h3><p className="muted">@{user.username}</p>
            <p>{user.email}</p><p>{user.address.city}</p>
          </Link>
        ))}
      </div>}
    </section>
  );
}

export default Users;
