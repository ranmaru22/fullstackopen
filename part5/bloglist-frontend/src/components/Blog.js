import React, { useState } from "react";
import "./Blog.css";

const Blog = ({ blog }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => setIsVisible(!isVisible);

    return (
        <div className="blog">
            <div>
                <strong>{blog.title}</strong> <em>{blog.author}</em>
                <button onClick={toggleVisible}>
                    {isVisible ? "hide details" : "show details"}
                </button>
            </div>
            <div className={isVisible ? "" : "hidden"}>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes <button>Like</button>
                </p>
                <p>Added by: {blog.user.name ?? blog.user.username}</p>
            </div>
        </div>
    );
};

export default Blog;
