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
  .then((data) => {
    // console.log("Inside GET Fetch: ", data);

    images = data;

    // console.log("Timing problem solution: ", images);

    // You only have access to the images array inside this .then function
    // So where do you need to call your render functions???
    renderPostCards(images);
    renderCommentsSection(images);
  });

console.log("images: ", images);

let comments = [];
fetch("http://localhost:3000/comments")
  .then((res) => res.json())
  .then((data) => {
    // console.log("Inside GET Fetch: ", data);
    // console.log("Comments inside fetch: ", data);
    comments = data;

    // renderCommentsSection(comments);
  });

console.log("comments: ", comments);

// Anchor elements
const imageContainerElem = document.querySelector(".image-container");

// console.log(imageContainerElem);

