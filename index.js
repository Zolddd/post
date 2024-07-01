document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const adminPostsContainer = document.getElementById('adminPostsContainer');
    const headingInput = document.getElementById('Heading');
    const subHeadingInput = document.getElementById('sub-Heading');

    function renderPosts() {
        let posts = localStorage.getItem('posts');
        adminPostsContainer.innerHTML = '';
        if (posts) {
            posts = JSON.parse(posts);
            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2 contenteditable="false">${post.title}</h2>
                    <p contenteditable="false">${post.content}</p>
                    <p class="author" contenteditable="false">- ${post.author}</p>
                    <button class="edit-btn" onclick="editPost(${index}, this)">Edit</button>
                    <button class="save-btn" onclick="savePost(${index}, this)" style="display:none;">Save</button>
                    <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
                `;
                adminPostsContainer.appendChild(postElement);
            });
        }
    }

    function deletePost(index) {
        let posts = localStorage.getItem('posts');
        if (posts) {
            posts = JSON.parse(posts);
            posts.splice(index, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            renderPosts();
        }
    }

    function editPost(index, editBtn) {
        const postElement = editBtn.closest('.post');
        const title = postElement.querySelector('h2');
        const content = postElement.querySelector('p:not(.author)');
        const author = postElement.querySelector('.author');

        // Enable content editing
        title.contentEditable = "true";
        content.contentEditable = "true";
        author.contentEditable = "true";

        // Show the save button and hide the edit button
        const saveBtn = postElement.querySelector('.save-btn');
        saveBtn.style.display = "inline-block";
        editBtn.style.display = "none";
    }

    function savePost(index, saveBtn) {
        const postElement = saveBtn.closest('.post');
        const title = postElement.querySelector('h2').innerText;
        const content = postElement.querySelector('p:not(.author)').innerText;
        const author = postElement.querySelector('.author').innerText.slice(2); // Remove the "- " part

        let posts = localStorage.getItem('posts');
        if (posts) {
            posts = JSON.parse(posts);
            posts[index] = { ...posts[index], title, content, author };
            localStorage.setItem('posts', JSON.stringify(posts));
            renderPosts();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        const heading = headingInput.value.trim();
        const subHeading = subHeadingInput.value.trim();

        const post = {
            id: new Date().getTime(),
            title: title,
            content: content,
            author: author
        };

        let posts = localStorage.getItem('posts');
        if (posts) {
            posts = JSON.parse(posts);
        } else {
            posts = [];
        }

        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        // Update heading and sub-heading in localStorage
        if (heading) {
            localStorage.setItem('heading', heading);
        } else {
            localStorage.removeItem('heading');
        }
        
        if (subHeading) {
            localStorage.setItem('subHeading', subHeading);
        } else {
            localStorage.removeItem('subHeading');
        }

        // Calculate which page to open in post.html
        const postIndex = posts.length - 1;
        const pageIndex = Math.floor(postIndex / 3) + 1;

        // Open the new page in post.html
        window.open(`post.html?page=${pageIndex}`, '_blank');

        postForm.reset();
    }

    window.deletePost = deletePost;
    window.editPost = editPost;
    window.savePost = savePost;

    postForm.addEventListener('submit', handleSubmit);

    renderPosts();
});
