// Function to handle login form submission
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  // Function to handle signup form submission
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  // Function to handle new post submission
  const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  // Function to handle post deletion
  const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const fetchDashboardData = async () => {
    const response = await fetch('/api/posts'); // Adjust the endpoint as needed
    if (response.ok) {
      const posts = await response.json();
      // Code to render posts on the dashboard
      renderPosts(posts);
    } else {
      console.error('Failed to fetch posts');
    }
  };
  
  const renderPosts = (posts) => {
    const postList = document.querySelector('.post-list');
    postList.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>Created on ${formatDate(post.created_at)}</p>
        <button data-id="${post.id}" class="delete-post">Delete</button>
        <a href="/dashboard/edit/${post.id}">Edit post</a>
      `;
      postList.appendChild(postElement);
    });
  };
  
  // Call this function when the dashboard page loads
  fetchDashboardData();

  // Add event listeners
  document
    .querySelector('.login-form')
    ?.addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    ?.addEventListener('submit', signupFormHandler);
  
  document
    .querySelector('.new-post-form')
    ?.addEventListener('submit', newPostHandler);
  
  document
    .querySelector('.post-list')
    ?.addEventListener('click', deletePostHandler);