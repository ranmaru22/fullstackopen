import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

import { initializeBlogs } from "./reducers/blogsReducer";
import { getUserFromToken, logoutUser } from "./reducers/userReducer";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);
    const notification = useSelector(state => state.notification);

    useEffect(() => {
        const userInStorage = window.localStorage.getItem("loggedInUser");
        if (userInStorage) {
            dispatch(getUserFromToken(JSON.parse(userInStorage)));
        }
        dispatch(initializeBlogs());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        dispatch(showNotification("Successfully logged out ..."));
    };

    if (!user.token) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification args={notification} />
                <p>Please log in</p>
                <div>
                    <LoginForm />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <p>Logged in as {user.name ?? user.username}</p>
                <p>
                    <button id="logoutBtn" onClick={handleLogout}>
                        Logout
                    </button>
                </p>
                <div id="blogs">
                    {blogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
                <h2>Add a new blog</h2>
                <div>
                    <NewBlogForm />
                </div>
            </div>
        );
    }
};

export default App;
