import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import "./NewBlogForm.css";

const NewBlogForm = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const toggleVisible = () => setIsVisible(!isVisible);

    const handleSubmit = async e => {
        e.preventDefault();
        const newBlog = { title, author, url };
        dispatch(createNewBlog(newBlog, token));
        setTitle("");
        setAuthor("");
        setUrl("");
        toggleVisible();
        dispatch(showNotification(`Added ${newBlog.title}`));
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

export default NewBlogForm;
