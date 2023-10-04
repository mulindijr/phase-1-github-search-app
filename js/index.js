document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    const apiUrl = 'https://api.github.com';
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = searchInput.value.trim();
      if (username !== '') {
        searchUsers(username);
      }
    });
  
    function searchUsers(username) {
      const searchUrl = `${apiUrl}/search/users?q=${username}`;
  
      fetch(searchUrl, { headers })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const userLi = document.createElement('li');
        userLi.innerHTML = `
          <div>
            <img src="${user.avatar_url}" alt="${user.login}" width="100">
            <h3>${user.login}</h3>
            <a href="${user.html_url}" target="_blank">View Profile</a>
          </div>
        `;
        userLi.addEventListener('click', () => {
          getUserRepos(user.login);
        });
        userList.appendChild(userLi);
      });
    }
  
    function getUserRepos(username) {
      const reposUrl = `${apiUrl}/users/${username}/repos`;
  
      fetch(reposUrl, { headers })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error('Error:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      if (repos.length === 0) {
        reposList.textContent = 'No repositories found.';
      } else {
        const reposHeading = document.createElement('h3');
        reposHeading.textContent = 'Repositories:';
        reposList.appendChild(reposHeading);
  
        const reposUl = document.createElement('ul');
        repos.forEach(repo => {
          const repoLi = document.createElement('li');
          repoLi.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          `;
          reposUl.appendChild(repoLi);
        });
        reposList.appendChild(reposUl);
      }
    }
});
  