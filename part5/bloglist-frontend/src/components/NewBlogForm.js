import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewBlogForm.css";

const NewBlogForm = ({ handleAdd }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const toggleVisible = () => setIsVisible(!isVisible);

    const handleSubmit = async e => {
        e.preventDefault();
        const newBlog = { title, author, url };
        await handleAdd(newBlog);
        setTitle("");
        setAuthor("");
        setUrl("");
        toggleVisible();
    };

    return (
        <div>
            <div className={isVisible ? "hidden" : ""}>
                <button onClick={toggleVisible}>Add new Blog</button>
            </div>
            <div className={isVisible ? "" : "hidden"}>
                <form id="addBlogForm" onSubmit={handleSubmit}>
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
                    <button type="reset" onClick={toggleVisible}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

NewBlogForm.propTypes = {
    handleAdd: PropTypes.func.isRequired
};

export default NewBlogForm;
