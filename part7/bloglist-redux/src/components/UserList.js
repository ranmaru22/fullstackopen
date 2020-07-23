import React from "react";
import { useSelector } from "react-redux";

const UserList = () => {
    const users = useSelector(state => state.userlist);

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name ?? u.username}</td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
