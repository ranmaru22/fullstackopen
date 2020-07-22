import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import "./Blog.css";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => setIsVisible(!isVisible);

    const handleDelete = blog => {
        dispatch(deleteBlog(blog.id, token));
        dispatch(showNotification(`Deleted ${blog.title}.`));
    };

    const handleLike = blog => {
        dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }, token));
        dispatch(showNotification(`Liked ${blog.title}.`));
    };

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
                    {blog.likes} likes{" "}
                    <button className="likeBtn" onClick={() => handleLike(blog)}>
                        Like
                    </button>
                </p>
                <p>Added by: {blog.user?.name ?? blog.user?.username ?? "Anonymous"}</p>
                <p>
                    <button className="deleteBtn" onClick={() => handleDelete(blog)}>
                        Delete Blog
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Blog;
