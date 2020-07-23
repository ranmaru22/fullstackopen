import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
    if (!user) {
        return null;
    } else {
        return (
            <div>
                <h2>{user.name ?? user.username}</h2>
                <h4>Added blogs</h4>
                <ul>
                    {user.blogs.map(b => (
                        <li key={b.id}>
                            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default User;
