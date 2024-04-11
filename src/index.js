// write your code here

// adding an event listener 

document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('card-title');
    const myRequest = new Request('http://localhost:3000/images')
    const commentRequest = new Request('http://localhost:3000/comments')
    const image = document.getElementById('card-image');
    const like = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    const comments = document.getElementById('comment');
    const form = document.getElementById('comment-form');
    const commentList = document.getElementById('comments-list');
    let count = 0;

    // fetching data from server
    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // using a for loop method for an increment  
            for (let i = 0; i < data.length; i++) {
                let obj = data[0];
                title.innerHTML = `${obj.title}`;
                image.src = `${obj.image}`;
// adding a few more event listeners
                like.addEventListener('click', () => {
                    count++;
                    likeCount.innerHTML = `${count} likes`;
                }

                )
            }

        });
    commentList.innerHTML = "";
    // getting some data from our database that is a local database
    fetch(commentRequest)
        .then((response) => response.json())
        .then((data) => {
            // the for loop
            for (let i = 0; i < data.length; i++) {
                let newComment = data[i];
                // console.log(newComment);

                const li = document.createElement("li");
                li.innerHTML = `${newComment.content}`;
                commentList.appendChild(li);
            }
        });
        // adding a few more event listeners
    form.addEventListener("submit", (event) => {
        // preventing the default reload of the page
        event.preventDefault();
        const postComments = document.getElementById("comment").value;
        console.log(postComments);
        if (postComments == "") {
            alert("Comment is null !, Please enter a comment ");
            return;
        }
// adding a new comment 
        fetch(commentRequest, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                imageId: 1,
                // id: { id },
                content: postComments,
            }),
        });
    });
})