// comment.js
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to comment forms
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(event) {
            handleCommentSubmit(event, this);
        });
    });
});

function handleCommentSubmit(event, form) {
    event.preventDefault();

    if (!window.isLoggedIn) {
        // Show the modal if not logged in
        document.getElementById('loginModal').style.display = 'block';
    } else {
        // If logged in, submit the form
        const postId = form.postId.value;
        const content = form.content.value;

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, content })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                // Handle success, reload the page or update comments section dynamically
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    }
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}
