import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";

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
            <div>
                <form id="addCommentForm" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="text"
                            type="text"
                            name="text"
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCommentForm;
