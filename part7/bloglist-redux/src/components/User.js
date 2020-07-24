import React from "react";
import { Link } from "react-router-dom";

import { Container, Header, Icon, List } from "semantic-ui-react";

const User = ({ user }) => {
    if (!user) {
        return null;
    } else {
        return (
            <Container>
                <Header as="h2">
                    <Icon name="user circle" />
                    {user.name ?? user.username}
                </Header>
                <Header as="h4">Added blogs</Header>
                <List divided relaxed id="blogs">
                    {user.blogs.map(blog => (
                        <List.Item className="blog" key={blog.id}>
                            <List.Content>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Container>
        );
    }
};

export default User;
