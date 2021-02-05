const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.has('postId') ? urlParams.get('postId') : 0;

console.log(postId);

const apiDomain = 'https://jsonplaceholder.typicode.com';
const api = {
    'posts': '/posts',
    'users': '/users'
}

const preloader = document.querySelector('.preload-wrap');
const postContainer = document.querySelector('.post__content');

function renderPostDetails({title, body}) {
    postContainer.innerHTML = `
        <h1 class="post__title">${title}</h1>
        <p>${body}</p>
    `;
}

fetch(`${apiDomain}${api.posts}/${postId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        preloader.classList.add('hidden');
        renderPostDetails(data);
    });
