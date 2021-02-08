import { 
    $,
    renderArticlePosts,
    setOptions,
    sortArrayByProp,
    filterArrayByProp
} from "../utils/helpers";

(() => {

    const SELECTOR = '.articles';
    if (!$(SELECTOR)) return;

    const apiDomain = 'https://jsonplaceholder.typicode.com';
    const api = {
        'posts': '/posts',
        'users': '/users'
    }

    const posts = [];
    const users = [];
    let filteredPosts = [];
    const articleLoader = $('.article__list-loader', $(SELECTOR));
    const postsContainer = $('.articles__list', $(SELECTOR));
    const selectSort = $('.post-sort', $(SELECTOR));
    const selectFilter = $('.post-filter', $(SELECTOR));

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

}) ();
