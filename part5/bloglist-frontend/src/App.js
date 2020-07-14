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

    const handleAdd = async blog => {
        try {
            const savedBlog = await blogService.create(blog, user.token);
            setBlogs(blogs.concat(savedBlog));
            callNotification(`Added blog ${savedBlog.title} by ${savedBlog.author}`);
        } catch {
            callNotification("Error adding blog.", true);
        }
    };

    const handleLike = async blog => {
        const patch = { likes: blog.likes + 1 };
        try {
            const updatedBlog = await blogService.update(blog.id, patch, user.token);
            setBlogs(
                blogs
                    .map(b => (b.id === updatedBlog.id ? updatedBlog : b))
                    .sort((a, b) => b.likes - a.likes)
            );
            callNotification(`Liked ${updatedBlog.title}!`);
        } catch (err) {
            callNotification(`Error liking ${blog.title}.`, true);
        }
    };

    const handleDelete = async blog => {
        if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
            try {
                await blogService.destroy(blog.id, user.token);
                setBlogs(blogs.filter(b => b.id !== blog.id));
                callNotification(`Deleted ${blog.title}!`);
            } catch (err) {
                callNotification(`Error deleting ${blog.title}.`, true);
            }
        }
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
                    <button id="logoutBtn" onClick={handleLogout}>
                        Logout
                    </button>
                </p>
                <div>
                    {blogs.map(blog => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLike={handleLike}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
                <h2>Add a new blog</h2>
                <div>
                    <NewBlogForm handleAdd={handleAdd} />
                </div>
            </div>
        );
    }
};

export default App;
