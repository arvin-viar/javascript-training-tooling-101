import { 
        isMobile,
        renderArticlePosts,
        setOptions,
        sortArrayByProp,
        filterArrayByProp,
        renderFeaturedPosts
    } from "./utils/helpers";

const apiDomain = 'https://jsonplaceholder.typicode.com';
const api = {
    'posts': '/posts',
    'users': '/users'
}
const posts = [];
const users = [];
let filteredPosts = [];
const articleLoader = document.querySelector('.article__list-loader');
const postsContainer = document.querySelector('.articles__list');
const selectSort = document.querySelector('.post-sort');
const selectFilter = document.querySelector('.post-filter');

function sortPosts() {
    const sortType = selectSort.value;
    const sortedArray = sortArrayByProp(filteredPosts, sortType, 'title');
    if (postsContainer) {
        renderArticlePosts(sortedArray, postsContainer);
    }
}

function filterPosts() {
    filteredPosts = [...posts];
    const filterOption = selectFilter.value;
    const sortValue = selectSort.value;
    if (filterOption !== 'all') {
        filteredPosts = filterArrayByProp(filteredPosts, filterOption, 'userId');
    }
    if (sortValue !== 'none') {
        sortPosts();
        return;
    }
    if (postsContainer) {
        renderArticlePosts(filteredPosts, postsContainer);
    }
}

// Fetch Data
if (postsContainer) {
    fetch(`${apiDomain}${api.posts}`)
        .then(response => response.json())
        .then(data => {
            posts.push(...data);
            filteredPosts.push(...data);
            if (postsContainer) {
                renderArticlePosts(data, postsContainer);
            }
        });
}

if (selectFilter) {
    fetch(`${apiDomain}${api.users}`)
        .then(response => response.json())
        .then(data => {
            users.push(...data);
            selectFilter.disabled = false;
            setOptions(data, selectFilter, 'id', 'name');
        });
}    

// Event Listeners
if (selectSort) {
    selectSort.addEventListener('change', sortPosts);
}
if (selectFilter) {
    selectFilter.addEventListener('change', filterPosts);
}


//Home Featured Posts
const featuredData = [];
const featuredContainer = document.querySelector('.featured__list');
fetch(`${apiDomain}${api.posts}`)
    .then(response => response.json())
    .then(data => {
        featuredData.push(...data);
        const lastIndex = featuredData.length - 1; 
        const newData = featuredData.slice(lastIndex - 5);
        if (featuredContainer) {
            renderFeaturedPosts(newData.reverse(), featuredContainer);
        }
    });

// Mobile Show Navigation
function showNav() {
    const mainNav = document.querySelector('.main-nav__menu');
    if (!mainNav || !isMobile) return;
    if (mainNav.classList.contains('is-hidden')) {
        mainNav.classList.remove('is-hidden');
    } else {
        mainNav.classList.add('is-hidden');
    }
}
const logo = document.querySelector('.main-nav__logo');
if (logo) {
    logo.addEventListener('click', showNav);
}
