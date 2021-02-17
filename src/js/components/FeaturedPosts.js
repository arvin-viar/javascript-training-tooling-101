import { $, renderFeaturedPosts } from "../utils/helpers";

(() => {

    const apiDomain = 'https://jsonplaceholder.typicode.com';
    const api = {
    'posts': '/posts',
    'users': '/users'
    }

    const SELECTOR = '.featured__list';
    if (!$(SELECTOR)) return;

    //Home Featured Posts
    const featuredData = [];
    const featuredContainer = $('.featured__list');
    fetch(`${apiDomain}${api.posts}`)
        .then(response => response.json())
        .then(data => {
            featuredData.push(...data);
            const lastIndex = featuredData.length; 
            const newData = featuredData.slice(lastIndex - 5);
            renderFeaturedPosts(newData.reverse(), featuredContainer);
        });

}) ();
