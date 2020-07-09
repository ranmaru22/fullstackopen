import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const savedUser = window.localStorage.getItem("blogAppUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("blogAppUser");
        setUser(null);
    };

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <p>Please log in</p>
                <div>
                    <LoginForm setUserFn={setUser} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <p>Logged in as {user.name ?? user.username}</p>
                <p>
                    <button onClick={handleLogout}>Logout</button>
                </p>
                <div>
                    {blogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
                <h2>Add a new blog</h2>
                <div>
                    <NewBlogForm
                        user={user}
                        blogs={blogs}
                        setBlogsFn={setBlogs}
                    />
                </div>
            </div>
        );
    }
};

export default App;

