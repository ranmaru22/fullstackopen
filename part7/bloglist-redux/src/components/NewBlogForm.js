import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";

import "./NewBlogForm.css";
import { Form, Button } from "semantic-ui-react";

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
            <section className={isVisible ? "hidden" : ""}>
                <Button positive onClick={toggleVisible}>
                    Add new Blog
                </Button>
            </section>
            <section className={isVisible ? "" : "hidden"}>
                <Form id="addBlogForm" onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input
                            label="Title"
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Form.Input
                            label="Author"
                            id="author"
                            type="text"
                            name="author"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                        <Form.Input
                            label="URL"
                            id="url"
                            type="text"
                            name="url"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                    </Form.Group>
                    <Button.Group>
                        <Button positive type="submit">
                            Create
                        </Button>
                        <Button.Or />
                        <Button negative type="reset" onClick={toggleVisible}>
                            Cancel
                        </Button>
                    </Button.Group>
                </Form>
            </section>
        </div>
    );
};

export default NewBlogForm;
