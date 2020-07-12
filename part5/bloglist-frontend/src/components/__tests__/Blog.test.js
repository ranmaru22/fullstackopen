import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "../Blog";

describe("Blog component", () => {
    let component;
    beforeEach(() => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "http://foo.bar",
            likes: 42,
            user: { id: 1, username: "root" }
        };
        const user = { id: 1, username: "root" };
        const allBlogs = [];
        const setBlogsFn = jest.fn();
        const cb = jest.fn();
        component = render(
            <Blog blog={blog} user={user} allBlogs={allBlogs} setBlogsFn={setBlogsFn} cb={cb} />
        );
    });

    it("renders correctly", () => {
        const titleSection = component.container.querySelector(".blogTitle");
        const detailsSection = component.container.querySelector(".blogDetails");
        expect(titleSection).toHaveTextContent("Test Blog Test Author");
        expect(detailsSection).toHaveClass("hidden");
    });
});
