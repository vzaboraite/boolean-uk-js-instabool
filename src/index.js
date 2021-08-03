/*
1.0 to START THE SERVER run this command in vscode terminal:
    json-server --watch db/db.json --routes db/routes.json

1.1 get data from db/db.json and set it to variable

2.0 use anchor element to append post articles:
    const imageContainerElem = document.querySelector(".image-container")

3.0 Create renderImageCard():
    - use example in index.html (<article class="image-card">...)

    - input: images[]
    - output: -


3.1 Create renderPosts():
    - use renderImageCard()

    - input: data from db.json ?
    - output: -

4.0 Create action functions:

4.1 addLike():
    - input: ?? 
    - output: -

4.2 addComment() ?

5.0 The data must be persisted in server, after refresh it shouldn't go away!
*/

// DATA from db.json for images and comments

let images = [];

fetch("http://localhost:3000/images")
  .then((res) => res.json())
  .then((imageData) => {
    // console.log("Inside GET Fetch: ", imageData);

    images = imageData;

    // console.log("Timing problem solution: ", images);
    // console.log("images: ", images);

    // You only have access to the images array inside this .then function
    // So where do you need to call your render functions???
    renderPostCards(images);
  });

// let comments = [];
// fetch("http://localhost:3000/comments")
//   .then((res) => res.json())
//   .then((comentData) => {
//     // console.log("Inside GET Fetch: ", comentData);
//     // console.log("Comments inside fetch: ", comentData);
//     comments = comentData;
//   });

// console.log("comments: ", comments);

// Anchor elements
const imageContainerElem = document.querySelector(".image-container");

// console.log(imageContainerElem);

// RENDER FUNCTIONS

function renderPostCards(postsData) {
  postsData.forEach((post) => {
    const imageCardElem = document.createElement("article");
    console.log(post);
    imageCardElem.setAttribute("class", "image-card");
    imageContainerElem.append(imageCardElem);

    const titleElem = document.createElement("h2");
    titleElem.setAttribute("class", "title");
    titleElem.innerText = post.title;
    imageCardElem.append(titleElem);

    const imageElem = document.createElement("img");
    imageElem.setAttribute("class", "image");
    imageElem.setAttribute("src", post.image);
    imageCardElem.append(imageElem);

    const likesSectionElem = document.createElement("div");
    likesSectionElem.setAttribute("class", "likes-section");
    imageCardElem.append(likesSectionElem);

    const likesElem = document.createElement("span");
    likesElem.setAttribute("class", "likes");
    likesElem.innerText = `${post.likes} likes`;
    likesSectionElem.append(likesElem);

    const likeBtnElem = document.createElement("button");
    likeBtnElem.setAttribute("class", "like-button");
    likeBtnElem.innerText = "♥";
    likeBtnElem.addEventListener("click", () => {
      console.log("clicked: ", post.id, post.likes);

      const fetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: post.likes + 1 }),
      };

      fetch(`http://localhost:3000/images/${post.id}`, fetchOptions)
        .then((res) => res.json())
        .then((imageData) => {
          console.log("Inside PATCH Fetch: ", imageData);
          likesElem.innerText = `${(post.likes += 1)} likes`;
        });
    });

    likesSectionElem.append(likeBtnElem);

    const commentsElem = document.createElement("ul");
    commentsElem.setAttribute("class", "comments");
    imageCardElem.append(commentsElem);

    post.comments.forEach((comment) => {
      const commentElem = document.createElement("li");
      commentElem.innerText = comment.content;
      commentsElem.append(commentElem);
    });

    const commentFormElem = document.createElement("form");
    commentFormElem.setAttribute("class", "comment-form");
    imageCardElem.append(commentFormElem);

    const commentInputElem = document.createElement("input");
    commentInputElem.setAttribute("class", "comment-input");
    commentInputElem.setAttribute("type", "text");
    commentInputElem.setAttribute("name", "comment");
    commentInputElem.setAttribute("placeholder", "Add a comment...");
    commentFormElem.append(commentInputElem);

    const commentBtnElem = document.createElement("button");
    commentBtnElem.setAttribute("class", "comment-button");
    commentBtnElem.setAttribute("type", "submit");
    commentBtnElem.innerText = "Post";
    commentFormElem.append(commentBtnElem);
  });
}
