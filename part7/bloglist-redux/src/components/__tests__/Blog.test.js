import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Blog from "../Blog";

describe("Blog component rendering", () => {
    const initialState = { user: { token: 1 } };
    const mockStore = configureStore();
    let component, store;
    beforeEach(() => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "http://foo.bar",
            likes: 42,
            user: { id: 1, username: "root" }
        };
        store = mockStore(initialState);
        component = render(
            <Provider store={store}>
                <Blog blog={blog} />
            </Provider>
        );
    });

    it("renders correctly", () => {
        const titleSection = component.container.querySelector(".blogTitle");
        const detailsSection = component.container.querySelector(".blogDetails");
        expect(titleSection).toHaveTextContent("Test Blog Test Author");
    });
});
