# JSONPlaceholder Beginner Project

Учебный React-проект с простым кодом для начинающего.

## Что используется
- `useState` — хранить данные, текст поиска и состояние загрузки.
- `useEffect` — выполнить запрос после открытия страницы.
- `fetch` — запросить данные с JSONPlaceholder.
- `map` — показать каждый элемент списка.
- `filter` — простой поиск по уже загруженным данным.
- Обычный CSS — внешний вид сайта.

## Как запустить
1. Открой эту папку в VS Code.
2. Открой меню Terminal → New Terminal.
3. Выполни `npm install`.
4. Когда установка закончится, выполни `npm run dev`.
5. Открой адрес, который покажет терминал.

## Страницы
- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts`
- Comments: `https://jsonplaceholder.typicode.com/comments`
- Todos: `https://jsonplaceholder.typicode.com/todos`
- Albums: `https://jsonplaceholder.typicode.com/albums`
- Photos: `https://jsonplaceholder.typicode.com/photos?_limit=30`

Это начальная версия, сосредоточенная на GET-запросах и отображении данных. POST, PUT, PATCH и DELETE можно добавить следующим шагом после того, как разберёмся с GET.

JSONPlaceholder учебный: изменения через POST/PUT/PATCH/DELETE не сохраняются постоянно.
