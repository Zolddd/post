document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const headingElement = document.getElementById('heading').querySelector('h1');
    const subHeadingElement = document.getElementById('sub-heading').querySelector('h3');

    // Fetch heading and sub-heading values from localStorage
    let heading = localStorage.getItem('heading');
    let subHeading = localStorage.getItem('subHeading');

    // Update heading and sub-heading elements in post.html
    headingElement.textContent = heading ? heading : '';
    subHeadingElement.textContent = subHeading ? subHeading : '';

    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    const postsPerPage = 3;

    let posts = localStorage.getItem('posts');
    if (posts) {
        posts = JSON.parse(posts);
        const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        // Calculate the index range for the current page
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        const paginatedPosts = posts.slice(start, end);

        postsContainer.innerHTML = '';
        paginatedPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p class="author">- ${post.author}</p>
            `;
            postsContainer.appendChild(postElement);
        });

        // Add pagination controls if there are multiple pages
        if (totalPages > 1) {
            const paginationControls = document.createElement('div');
            paginationControls.classList.add('pagination');

            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = `post.html?page=${i}`;
                pageLink.textContent = i;
                if (i === page) {
                    pageLink.classList.add('active');
                }
                paginationControls.appendChild(pageLink);
            }
            postsContainer.appendChild(paginationControls);
        }
    }
});
