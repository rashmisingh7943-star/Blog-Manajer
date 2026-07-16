// src/js/data.js

const STORAGE_KEY = "blog-manager-data";

// ==============================
// Load Blogs from localStorage
// ==============================

let blogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ==============================
// First Time Sample Blogs
// ==============================

if (blogs.length === 0) {

  blogs = [

    {
      id: 1,

      title: "Welcome to Blog Manager",

      body:
        "This is your first blog. You can create, edit, delete and filter blogs. All blogs are automatically saved in Local Storage.",

      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",

      tags: ["welcome", "blog", "javascript"],

      createdAt: new Date().toLocaleDateString("en-IN")
    },

    {
      id: 2,

      title: "Why Learn JavaScript?",

      body:
        "JavaScript is one of the most popular programming languages for building interactive websites. Mastering JavaScript opens doors to frontend, backend and full-stack development.",

      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200",

      tags: ["javascript", "web", "coding"],

      createdAt: new Date().toLocaleDateString("en-IN")
    }

  ];

  saveBlogs();

}

// ==============================
// Save Blogs
// ==============================

function saveBlogs() {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(blogs)

  );

}

// ==============================
// Get All Blogs
// ==============================

export function getBlogs() {

  return blogs;

}

// ==============================
// Add Blog
// ==============================

export function addBlog(blog) {

  blog.createdAt = new Date().toLocaleDateString(

    "en-IN",

    {

      day: "2-digit",

      month: "short",

      year: "numeric"

    }

  );

  blogs.unshift(blog);

  saveBlogs();

}

// ==============================
// Delete Blog
// ==============================

export function deleteBlog(id) {

  blogs = blogs.filter(

    blog => blog.id !== id

  );

  saveBlogs();

}

// ==============================
// Update Blog
// ==============================

export function updateBlog(id, updatedBlog) {

  blogs = blogs.map(blog => {

    if (blog.id === id) {

      return {

        ...blog,

        ...updatedBlog,

        createdAt: blog.createdAt

      };

    }

    return blog;

  });

  saveBlogs();

}

// ==============================
// Get Blog By ID
// ==============================

export function getBlogById(id) {

  return blogs.find(

    blog => blog.id === id

  );

}

// ==============================
// Search Blogs
// ==============================

export function searchBlogs(keyword) {

  keyword = keyword.toLowerCase();

  return blogs.filter(blog =>

    blog.title.toLowerCase().includes(keyword) ||

    blog.body.toLowerCase().includes(keyword) ||

    blog.tags.join(" ").toLowerCase().includes(keyword)

  );

}

// ==============================
// Filter Blogs by Tag
// ==============================

export function filterBlogs(tag) {

  if (tag === "all") {

    return blogs;

  }

  return blogs.filter(blog =>

    blog.tags.includes(tag)

  );

}

// ==============================
// Clear All Blogs
// ==============================

export function clearBlogs() {

  blogs = [];

  saveBlogs();

}