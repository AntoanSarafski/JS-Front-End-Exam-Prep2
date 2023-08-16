window.addEventListener("load", solve);

function solve() {
  const publishButton = document.querySelector("#publish-btn");
  publishButton.addEventListener("click", (e) => {
    const titleElement = document.querySelector("#task-title");
    const categoryElement = document.querySelector("#task-category");
    const contentElement = document.querySelector("#task-content");

    const title = titleElement.value;
    const category = categoryElement.value;
    const content = contentElement.value;

    if (!title || !category || !content) {
      return;
    }

    const titleHeaderElement = document.createElement("h4");
    titleHeaderElement.textContent = title;

    const categoryParagraphElement = document.createElement("p");
    categoryParagraphElement.textContent = `Category: ${category}`;

    const contentParagraphElement = document.createElement("p");
    contentParagraphElement.textContent = `Content: ${content}`;

    const articleElement = document.createElement("article");
    articleElement.appendChild(titleHeaderElement);
    articleElement.appendChild(categoryParagraphElement);
    articleElement.appendChild(contentParagraphElement);

    const buttonEditElement = document.createElement("button");
    buttonEditElement.classList = "action-btn edit";
    buttonEditElement.textContent = "Edit";

    const buttonPostElement = document.createElement("button");
    buttonPostElement.classList = "action-btn post";
    buttonPostElement.textContent = "Post";

    const listItemElement = document.createElement("li");
    listItemElement.classList = "rpost";
    listItemElement.appendChild(articleElement);
    listItemElement.appendChild(buttonEditElement);
    listItemElement.appendChild(buttonPostElement);

    const reviewListElement = document.querySelector("#review-list");
    const publishedListElement = document.querySelector("#published-list");
    reviewListElement.appendChild(listItemElement);

    titleElement.value = "";
    categoryElement.value = "";
    contentElement.value = "";

    buttonEditElement.addEventListener("click", (e) => {
      titleElement.value = title;
      categoryElement.value = category;
      contentElement.value = content;

      listItemElement.remove();
    });

    buttonPostElement.addEventListener("click", (e) => {
      publishedListElement.appendChild(listItemElement);
      buttonEditElement.remove();
      buttonPostElement.remove();
    });
  });
}
