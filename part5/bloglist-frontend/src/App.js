import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({});

    useEffect(() => {
        async function fetchBlogs() {
            const blogs = await blogService.getAll();
            setBlogs(blogs.sort((a, b) => b.likes - a.likes));
        }
        const savedUser = window.localStorage.getItem("blogAppUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
        }
        fetchBlogs();
    }, []);

    const callNotification = (msg, isError = false, duration = 2500) => {
        setNotification({ msg, isError, duration });
        setTimeout(() => setNotification({}), duration + 1);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("blogAppUser");
        setUser(null);
    };

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification args={notification} />
                <p>Please log in</p>
                <div>
                    <LoginForm setUserFn={setUser} cb={callNotification} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification args={notification} />
                <p>Logged in as {user.name ?? user.username}</p>
                <p>
                    <button onClick={handleLogout}>Logout</button>
                </p>
                <div>
                    {blogs.map(blog => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            allBlogs={blogs}
                            setBlogsFn={setBlogs}
                            cb={callNotification}
                        />
                    ))}
                </div>
                <h2>Add a new blog</h2>
                <div>
                    <NewBlogForm
                        user={user}
                        blogs={blogs}
                        setBlogsFn={setBlogs}
                        cb={callNotification}
                    />
                </div>
            </div>
        );
    }
};

export default App;
