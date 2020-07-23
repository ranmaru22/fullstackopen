import React, { useEffect } from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Notification from "./components/Notification";

import "./components/Blog.css";

import { initializeBlogs } from "./reducers/blogsReducer";
import { getUserFromToken } from "./reducers/userReducer";
import { getUserlist } from "./reducers/userlistReducer";

const App = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);
    const userlist = useSelector(state => state.userlist);
    const notification = useSelector(state => state.notification);

    useEffect(() => {
        const userInStorage = window.localStorage.getItem("loggedInUser");
        if (userInStorage) {
            dispatch(getUserFromToken(JSON.parse(userInStorage)));
        }
        dispatch(initializeBlogs());
        dispatch(getUserlist());
    }, [dispatch]);

    const userMatch = useRouteMatch("/users/:id");
    const matchedUser = userMatch ? userlist.find(u => u.id === userMatch.params.id) : null;
    const blogMatch = useRouteMatch("/blogs/:id");
    const matchedBlog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null;

    if (!user.token) {
        return (
            <div>
                <h2>Blogs</h2>
                <Notification args={notification} />
                <p>Please log in ...</p>
                <div>
                    <LoginForm />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <NavBar />
                <Notification />

                <h2>Blogs</h2>
                <Switch>
                    <Route path="/users/:id">
                        <User user={matchedUser} />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog blog={matchedBlog} />
                    </Route>
                    <Route path="/">
                        <NewBlogForm />
                        <div id="blogs">
                            {blogs.map(blog => (
                                <article className="blog" id={blog.id}>
                                    <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                                </article>
                            ))}
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }
};

export default App;
