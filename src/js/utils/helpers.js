export function isMobile() {
    return window.innerWidth < 768;
}

export function fetchData(domain, endpoint) {
    const arrayData = []; 
    fetch(`${domain}${endpoint}`)
        .then(response => response.json())
        .then(data => {
            arrayData.push(...data);
        });
    return arrayData;
}

export function renderArticlePosts(arrPosts, container) {
    const postsHTML = arrPosts.map(data => {
        return `
            <article class="articles__item">
                <div class="articles__item-imgwrap">
                    <img src="./src/images/cam-p${Math.floor(Math.random() * 6)}.jpg" alt="article image" />
                    <div class="articles__item-posted">
                        <div>
                            <span class="day">21</span>
                        </div>
                        <div>
                            <span class="year">2021</span>
                            <span class="month">January</span>
                        </div>
                    </div>
                </div>
                <div class="articles__item-details">
                    <h1>${data.title}</h1>
                    <p>
                        ${data.body}
                    </p>
                    <a href="/post.html?postId=${data.id}">Read More</a>
                </div>
            </article>
        `;
    }).join('');
    container.innerHTML = postsHTML;
}

export function setOptions(arrOptions, container, propValue, propName) {
    const userOptions = arrOptions.map(option => {
        return `
            <option value="${option[propValue]}">${option[propName]}</option>
        `;
    }).join('');
    container.insertAdjacentHTML('beforeend', userOptions);
}

export function sortArrayByProp(array, sortType, property) {
    const sortedArray = [];
    sortedArray.push(...array);
    switch (sortType) {
        case 'alphaAsc':
            sortedArray.sort((a, b) => a[property] > b[property] ? 1 : -1);
            break;
        case 'alphaDesc':
            sortedArray.sort((a, b) => a[property] < b[property] ? 1 : -1);
            break;
        default:
            console.log('do nothing');
            break;
    }
    return sortedArray;
}

export function filterArrayByProp(array, filterValue, property = 'id') {
    return array.filter(post => post[property] === parseInt(filterValue));
}

export function renderFeaturedPosts(arrPosts, container) {
    const postsHTML = arrPosts.map(data => {
        return `
            <div class="featured__item" data-postid="${data.id}">
                <figure class="featured__item-imgwrap">
                    <img src="./src/images/temp/consoles.jpg" alt="gaming consoles" />
                    <div class="featured__item-socials">
                        <span class="featured__item-social social--facebook">Facebook</span>
                        <span class="featured__item-social social--twitter">Twitter</span>
                        <span class="featured__item-social social--youtube">Youtube</span>
                        <span class="featured__item-social social--pinterest">Pinterest</span>
                    </div>
                </figure>
                <div class="featured__item-details">
                    <div>
                        <p class="featured__item-details-category">Gaming Consoles</p>
                        <h1>${data.title}</h1>
                    </div>
                    <p class="featured__item-details-posted">Jan 19, 2021 | 10min read</p>
                </div>
            </div>
        `;
    }).join('');
    container.innerHTML = postsHTML;
}
