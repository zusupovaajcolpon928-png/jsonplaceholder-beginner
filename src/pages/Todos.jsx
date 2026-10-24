import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError("Не удалось загрузить задачи. Проверь интернет-соединение.");
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">GET /todos</p><h2>Todos — задачи</h2><p>Список задач и статус выполнения.</p></div><span className="count">{todos.length} записей</span></div>
      <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по названию задачи..." />
      {loading && <p className="message">Загружаем задачи...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && <div className="cards">
        {filteredTodos.map((todo) => <Link className={`card card-link todo-card ${todo.completed ? "completed" : "pending"}`} to={`/todos/${todo.id}`} key={todo.id}><div className="card-top"><span className="tag">Todo · ID {todo.id}</span><span className={todo.completed ? "status done" : "status pending"}>{todo.completed ? "Completed" : "Not completed"}</span></div><h3>{todo.title}</h3><p className="muted">User ID: {todo.userId}</p></Link>)}
      </div>}
    </section>
  );
}

export default Todos;
