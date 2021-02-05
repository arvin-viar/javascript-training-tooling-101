import { 
        $,
        $$,
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
const articleLoader = $('.article__list-loader');
const postsContainer = $('.articles__list');
const selectSort = $('.post-sort');
const selectFilter = $('.post-filter');

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
const featuredContainer = $('.featured__list');
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
    const mainNav = $('.main-nav__menu');
    if (!mainNav || !isMobile) return;
    if (mainNav.classList.contains('is-hidden')) {
        mainNav.classList.remove('is-hidden');
    } else {
        mainNav.classList.add('is-hidden');
    }
}
const logo = $('.main-nav__logo');
if (logo) {
    logo.addEventListener('click', showNav);
}
