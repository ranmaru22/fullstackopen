import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Header, Table } from "semantic-ui-react";

const UserList = () => {
    const users = useSelector(state => state.userlist);

    return (
        <Container>
            <Header as="h2">Users</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Blogs created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(u => (
                        <Table.Row key={u.id}>
                            <Table.Cell>
                                <Link to={`/users/${u.id}`}>{u.name ?? u.username}</Link>
                            </Table.Cell>
                            <Table.Cell>{u.blogs.length}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default UserList;
