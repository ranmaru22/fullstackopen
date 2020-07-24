import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import NewCommentForm from "./NewCommentForm";

import "./Blog.css";
import { Container, Header, Message, Button, Label, Icon, Feed } from "semantic-ui-react";

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
            <Container>
                <Message className="blog">
                    <Message.Header as="h2" className="blogTitle">
                        {blog.title}, by <em>{blog.author}</em>
                    </Message.Header>
                    <div className="blogDetails">
                        <section>
                            <a href={blog.url}>{blog.url}</a>
                        </section>

                        {blog.user && (
                            <section>
                                Added by:{" "}
                                <Link to={`/users/${blog.user.id}`}>
                                    {blog.user.name ?? blog.user.username}
                                </Link>
                            </section>
                        )}

                        <section>
                            <Button
                                as="div"
                                className="likeBtn"
                                onClick={() => handleLike(blog)}
                                labelPosition="left">
                                <Label as="a" basic pointing="right">
                                    {blog.likes}
                                </Label>
                                <Button icon>
                                    <Icon name="thumbs up" />
                                    Like
                                </Button>
                            </Button>
                            <Button
                                negative
                                className="deleteBtn"
                                onClick={() => handleDelete(blog)}>
                                <Icon name="delete" />
                                Delete Blog
                            </Button>
                        </section>

                        <section className="blogComments">
                            <Header as="h4">Comments</Header>
                            {blog.comments && (
                                <Feed size="small">
                                    {blog.comments.map(c => (
                                        <Feed.Event key={c.id}>
                                            <Feed.Content summary={c.text} />
                                        </Feed.Event>
                                    ))}
                                </Feed>
                            )}
                            <NewCommentForm blog={blog} />
                        </section>
                    </div>
                </Message>
            </Container>
        );
    }
};

export default Blog;
