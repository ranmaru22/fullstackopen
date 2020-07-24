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

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Header, Icon, Container, List } from "semantic-ui-react";

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
            <Container>
                <Header as="h1" className="loggedOutHeader">
                    <Icon name="blogger b" />
                    <Header.Content>
                        Blogs
                        <Header.Subheader>Please log in ...</Header.Subheader>
                    </Header.Content>
                </Header>
                <Notification args={notification} />
                <div>
                    <LoginForm />
                </div>
            </Container>
        );
    } else {
        return (
            <div>
                <NavBar />
                <Container>
                    <Notification />

                    <Header as="h1">
                        <Icon name="blogger b" />
                        <Header.Content>
                            Blogs
                            <Header.Subheader>Amazing blog aggregator!</Header.Subheader>
                        </Header.Content>
                    </Header>

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
                            <Container>
                                <NewBlogForm />
                            </Container>
                            <Container>
                                <List divided relaxed id="blogs">
                                    {blogs.map(blog => (
                                        <List.Item className="blog" key={blog.id}>
                                            <List.Content>
                                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                            </List.Content>
                                        </List.Item>
                                    ))}
                                </List>
                            </Container>
                        </Route>
                    </Switch>
                </Container>
            </div>
        );
    }
};

export default App;
