import React, { useState } from "react";
import "./Blog.css";
import blogService from "../services/blogs";

const Blog = ({ blog, user, allBlogs, setBlogsFn, cb }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => setIsVisible(!isVisible);

    const handleLike = async blog => {
        const patch = { likes: blog.likes + 1 };
        try {
            const updatedBlog = await blogService.update(blog.id, patch, user.token);
            setBlogsFn(
                allBlogs
                    .map(b => (b.id === updatedBlog.id ? updatedBlog : b))
                    .sort((a, b) => b.likes - a.likes)
            );
            cb(`Liked ${updatedBlog.title}!`);
        } catch (err) {
            cb(`Error liking ${blog.title}.`, true);
        }
    };

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
                    {blog.likes} likes <button onClick={() => handleLike(blog)}>Like</button>
                </p>
                <p>Added by: {blog.user.name ?? blog.user.username}</p>
            </div>
        </div>
    );
};

export default Blog;
