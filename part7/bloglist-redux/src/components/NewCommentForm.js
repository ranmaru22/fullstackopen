import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";

import { Form } from "semantic-ui-react";

const NewCommentForm = ({ blog }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [commentText, setCommentText] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const newComment = { text: commentText, blog: blog.id };
        dispatch(addNewComment(newComment, token));
        setCommentText("");
        dispatch(showNotification(`Added comment to ${blog.title}`));
    };

    return (
        <div>
            <Form id="addCommentForm" onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        id="text"
                        type="text"
                        name="text"
                        placeholder="Add a comment ..."
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <Form.Button type="submit">Submit</Form.Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default NewCommentForm;
