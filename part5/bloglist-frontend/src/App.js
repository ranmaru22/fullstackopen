import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs));
    }, []);

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
                <div>
                    {blogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;

