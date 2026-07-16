// src/js/ui.js

import { getBlogs } from "./data.js";

export function renderBlogList(container, selectedTag = "all") {
  container.innerHTML = "";

  const blogs = getBlogs().filter((blog) => {
    if (selectedTag === "all") return true;
    return (blog.tags || []).includes(selectedTag);
  });

  if (blogs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="ri-article-line"></i>
        <h3>No Blogs Found</h3>
        <p>Create your first blog to get started.</p>
      </div>
    `;
    return;
  }

  blogs.forEach((blog) => {
    const card = document.createElement("div");
    card.className = "blog-item";

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    card.innerHTML = `

      ${
        blog.image
          ? `<img class="blog-img"
                 src="${escapeHTML(blog.image)}"
                 alt="${escapeHTML(blog.title)}">`
          : ""
      }

      <div class="blog-content">

          <h3 class="blog-title">
              <i class="ri-article-line"></i>
              ${escapeHTML(blog.title)}
          </h3>

          <p class="blog-body">
              ${escapeHTML(blog.body)}
          </p>

          <div class="tags">
              ${(blog.tags || [])
                .map(
                  (tag) =>
                    `<span>${escapeHTML(tag)}</span>`
                )
                .join("")}
          </div>

          <div class="blog-footer">

              <div class="blog-date">

                  <i class="ri-calendar-line"></i>

                  ${today}

              </div>

              <div class="blog-id">

                  #${blog.id}

              </div>

          </div>

          <div class="actions">

              <button
                  class="edit-btn"
                  data-id="${blog.id}"
              >

                  <i class="ri-edit-line"></i>

                  Edit

              </button>

              <button
                  class="delete-btn"
                  data-id="${blog.id}"
              >

                  <i class="ri-delete-bin-line"></i>

                  Delete

              </button>

          </div>

      </div>

    `;

    container.appendChild(card);
  });
}

function escapeHTML(text) {
  if (!text) return "";

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

export function bindEvents(container, onDelete, onEdit) {
  container.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.classList.contains("delete-btn")) {
      onDelete(id);
    }

    if (button.classList.contains("edit-btn")) {
      onEdit(id);
    }
  });
}