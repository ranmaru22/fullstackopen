import React, { useState } from "react";
import blogService from "../services/blogs";

const NewBlogForm = ({ user, blogs, setBlogsFn, cb }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const newBlog = { title, author, url };
        try {
            const savedBlog = await blogService.create(newBlog, user.token);
            setBlogsFn(blogs.concat(savedBlog));
            setTitle("");
            setAuthor("");
            setUrl("");
            cb(`Added blog ${savedBlog.title} by ${savedBlog.author}`);
        } catch {
            cb("Error adding blog.", true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Title:
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
            </div>
            <div>
                URL:
                <input
                    id="url"
                    type="text"
                    name="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default NewBlogForm;
