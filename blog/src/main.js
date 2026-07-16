// src/main.js

import {
  addBlog,
  deleteBlog,
  getBlogs,
  updateBlog
} from "./js/data.js";

import {
  renderBlogList,
  bindEvents
} from "./js/ui.js";

// =============================
// DOM Elements
// =============================

const form = document.getElementById("blog-form");

const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const imageInput = document.getElementById("image");
const tagsInput = document.getElementById("tags");

const blogList = document.getElementById("blog-list");
const filter = document.getElementById("filter");

const submitText = document.getElementById("submit-text");

// =============================

let editingId = null;

// =============================
// Footer Date
// =============================

const dateEl = document.getElementById("current-date");

if (dateEl) {

    dateEl.textContent = new Date().toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );

}

// =============================
// Update Filter Dropdown
// =============================

function updateFilter(){

    const tags=[
        ...new Set(
            getBlogs().flatMap(blog=>blog.tags||[])
        )
    ];

    filter.innerHTML=
    `<option value="all">All Blogs</option>`;

    tags.forEach(tag=>{

        const option=document.createElement("option");

        option.value=tag;

        option.textContent=tag;

        filter.appendChild(option);

    });

}

// =============================
// Refresh UI
// =============================

function refresh(){

    renderBlogList(
        blogList,
        filter.value
    );

    updateFilter();

}

// =============================
// Add / Update Blog
// =============================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const title=titleInput.value.trim();

    const body=bodyInput.value.trim();

    const image=imageInput.value.trim();

    const tags=tagsInput.value
    .split(",")
    .map(tag=>tag.trim())
    .filter(Boolean);

    if(!title || !body){

        alert("Please fill all required fields.");

        return;

    }

    const blog={

        title,

        body,

        image,

        tags

    };

    if(editingId){

        updateBlog(

            editingId,

            blog

        );

        editingId=null;

        submitText.textContent="Add Blog";

    }

    else{

        addBlog({

            id:Date.now(),

            ...blog

        });

    }

    form.reset();

    refresh();

});

// =============================
// Delete & Edit
// =============================

bindEvents(

blogList,

(id)=>{

    const confirmDelete=confirm(

        "Delete this blog?"

    );

    if(!confirmDelete) return;

    deleteBlog(id);

    refresh();

},

(id)=>{

    const blog=getBlogs().find(

        blog=>blog.id===id

    );

    if(!blog) return;

    titleInput.value=blog.title;

    bodyInput.value=blog.body;

    imageInput.value=blog.image||"";

    tagsInput.value=(blog.tags||[]).join(",");

    editingId=id;

    submitText.textContent="Update Blog";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

);

// =============================
// Filter Blogs
// =============================

filter.addEventListener("change",()=>{

    renderBlogList(

        blogList,

        filter.value

    );

});

// =============================
// Theme Button
// =============================

const themeBtn=document.querySelector(".theme-btn");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const icon=themeBtn.querySelector("i");

if(document.body.classList.contains("dark")){

icon.className="ri-sun-line";

}else{

icon.className="ri-moon-line";

}

});

}

// =============================
// Initial Render
// =============================

refresh();