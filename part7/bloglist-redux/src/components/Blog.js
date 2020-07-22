import React, { useState } from "react";
import "./Blog.css";

const Blog = ({ blog }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => setIsVisible(!isVisible);

    return (
        <div className="blog">
            <div className="blogTitle">
                <strong>{blog.title}</strong> <em>{blog.author}</em>
                <button className="detailsBtn" onClick={toggleVisible}>
                    {isVisible ? "hide details" : "show details"}
                </button>
            </div>
            <div className={isVisible ? "blogDetails" : "blogDetails hidden"}>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes <button className="likeBtn">Like</button>
                </p>
                <p>Added by: {blog.user?.name ?? blog.user?.username ?? "Anonymous"}</p>
                <p>
                    <button className="deleteBtn">Delete Blog</button>
                </p>
            </div>
        </div>
    );
};

export default Blog;
