const apiDomain = 'https://jsonplaceholder.typicode.com';
const api = {
    'posts': '/posts',
    'users': '/users'
}
const posts = [];
const users = [];
let filteredPosts = [];
const preloader = document.querySelector('.preload-wrap');
const postsContainer = document.querySelector('.posts__list');
const selectSort = document.querySelector('.post-sort');
const selectFilter = document.querySelector('.post-filter');

function renderPosts(postsData) {
    const postsHTML = postsData.map(post => {
        return `
            <li class="posts__list-item">
                <a href="#${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                <p>${post.body}</p>
            </li>
        `;
    }).join('');
    postsContainer.innerHTML = postsHTML;
}

function setUserOptions() {
    const userOptions = users.map(user => {
        return `
            <option value="${user.id}">${user.name}</option>
        `;
    }).join('');
    selectFilter.insertAdjacentHTML('beforeend', userOptions);
}

function sortPosts() {
    selectSort.children[0].disabled = true;
    const sortOption = selectSort.value;
    switch (sortOption) {
        case 'alphaAsc':
            filteredPosts.sort((a, b) => a.title > b.title ? 1 : -1);
            break;
        case 'alphaDesc':
            filteredPosts.sort((a, b) => a.title < b.title ? 1 : -1);
            break;
        default:
            console.log('do nothing');
            break;
    }
    renderPosts(filteredPosts);
}

function filterPosts() {
    filteredPosts = [...posts];
    const filterOption = this.selectedOptions[0].value;
    const sortValue = selectSort.value;
    if (filterOption !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.userId === parseInt(filterOption));
    }
    if (sortValue !== 'none') {
        sortPosts();
    }
    renderPosts(filteredPosts);
}

// Fetch Data
fetch(`${apiDomain}${api.posts}`)
    .then(response => response.json())
    .then(data => {
        posts.push(...data);
        filteredPosts.push(...data);
        preloader.classList.add('hidden');
        renderPosts(posts);
    });
    
fetch(`${apiDomain}${api.users}`)
    .then(response => response.json())
    .then(data => {
        users.push(...data);
        selectFilter.disabled = false;
        setUserOptions(users);
    });

// Event Listeners
selectSort.addEventListener('change', sortPosts);
selectFilter.addEventListener('change', filterPosts);
