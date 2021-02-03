//  On load, fetch blog post
const posts = [];
const preloader = document.querySelector('.preloader');
const postsContainer = document.querySelector('ul.posts');

function render() {
    console.log(posts);
    const postsHTML = posts.map(post => {
        return `
            <li>
                <a href="#${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
            </li>
        `;
    }).join('');
    postsContainer.innerHTML = postsHTML;
}

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        posts.push(...data);
        preloader.classList.add('hidden');
        render();
    });

// While fetching, show loader icon

// Once blog post loaded, render into the DOM

// Show sorting and filtering options
const sortedPosts = [...posts.sort()];

// Make the sorting function work

// Make the filtering function work
// -> get the names of the users
// -> get/set user options
// -> filter posts by selected user
