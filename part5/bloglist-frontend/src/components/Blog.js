import React, { useState } from "react";
import PropTypes from "prop-types";
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

    const handleDelete = async blog => {
        if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
            try {
                await blogService.destroy(blog.id, user.token);
                setBlogsFn(allBlogs.filter(b => b.id !== blog.id));
                cb(`Deleted ${blog.title}!`);
            } catch (err) {
                cb(`Error deleting ${blog.title}.`, true);
            }
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
                <p>
                    <button onClick={() => handleDelete(blog)}>Delete Blog</button>
                </p>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    allBlogs: PropTypes.arrayOf(Object).isRequired,
    setBlogsFn: PropTypes.func.isRequired,
    cb: PropTypes.func.isRequired
};

export default Blog;
