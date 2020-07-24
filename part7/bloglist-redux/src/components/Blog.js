import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import "./Blog.css";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const handleDelete = blog => {
        dispatch(deleteBlog(blog.id, token));
        dispatch(showNotification(`Deleted ${blog.title}.`));
    };

    const handleLike = blog => {
        dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }, token));
        dispatch(showNotification(`Liked ${blog.title}.`));
    };

    if (!blog) {
        return null;
    } else {
        return (
            <div className="blog">
                <div className="blogTitle">
                    <h2>
                        {blog.title} <em>{blog.author}</em>
                    </h2>
                </div>
                <div className="blogDetails">
                    <p>
                        <a href={blog.url}>{blog.url}</a>
                    </p>
                    <p>
                        {blog.likes} likes{" "}
                        <button className="likeBtn" onClick={() => handleLike(blog)}>
                            Like
                        </button>
                    </p>

                    {blog.user && (
                        <p>
                            Added by:{" "}
                            <Link to={`/users/${blog.user.id}`}>
                                {blog.user.name ?? blog.user.username}
                            </Link>
                        </p>
                    )}

                    <p>
                        <button className="deleteBtn" onClick={() => handleDelete(blog)}>
                            Delete Blog
                        </button>
                    </p>

                    {blog.comments && (
                        <div>
                            <h4>Comments</h4>
                            <ul>
                                {blog.comments.map(c => (
                                    <li key={c.id}>{c.text}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default Blog;
