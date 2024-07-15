const DataService = (function() {
    const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';
    const todosEndpoint = 'https://jsonplaceholder.typicode.com/todos';
  
    async function fetchData(endpoint) {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
      }
      return await response.json();
    }
  
    async function fetchPosts() {
      return await fetchData(postsEndpoint);
    }
  
    async function fetchTodos() {
      return await fetchData(todosEndpoint);
    }
  
    return {
      fetchPosts,
      fetchTodos
    };
  })();
  
  const UI = (function() {
    const postsContainer = document.getElementById('posts-container');
    const todosContainer = document.getElementById('todos-container');
    const errorMessage = document.getElementById('error-message');
  
    function displayPosts(posts) {
      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    }
  
    function displayTodos(todos) {
      todosContainer.innerHTML = '';
      todos.forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.classList.add('todo');
        todoElement.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled />
          <label>${todo.title}</label>
        `;
        todosContainer.appendChild(todoElement);
      });
    }
  
    function displayError(message) {
      errorMessage.textContent = message;
    }
  
    return {
      displayPosts,
      displayTodos,
      displayError
    };
  })();
  
  (async function() {
    try {
      const posts = await DataService.fetchPosts();
      const todos = await DataService.fetchTodos();
      UI.displayPosts(posts);
      UI.displayTodos(todos);
    } catch (error) {
      console.error('Error:', error.message);
      UI.displayError('Failed to fetch data. Please try again later.');
    }
  })();