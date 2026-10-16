import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Users from "./pages/Users.jsx";
import Posts from "./pages/Posts.jsx";
import Comments from "./pages/Comments.jsx";
import Todos from "./pages/Todos.jsx";
import Albums from "./pages/Albums.jsx";
import Photos from "./pages/Photos.jsx";
import Details from "./pages/Details.jsx";

const pages = ["users", "posts", "comments", "todos", "albums", "photos"];

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo-mark">{`{ }`}</div>
        <div>
          <h1>JSONPlaceholder</h1>
          <p>Учебный проект для практики API</p>
        </div>
      </header>

      <nav className="navigation">
        {pages.map((page) => (
          <NavLink className={({ isActive }) => isActive ? "active" : ""} to={`/${page}`} key={page}>
            {page[0].toUpperCase() + page.slice(1)}
          </NavLink>
        ))}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/:resource/:id" element={<Details />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="footer">
      
      </footer>
    </div>
  );
}

export default App;
