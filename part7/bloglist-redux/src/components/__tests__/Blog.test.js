import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../Blog";

describe("Blog component rendering", () => {
    let component;
    beforeEach(() => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "http://foo.bar",
            likes: 42,
            user: { id: 1, username: "root" }
        };
        const handleLike = jest.fn();
        const handleDelete = jest.fn();
        component = render(
            <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        );
    });

    it("renders correctly", () => {
        const titleSection = component.container.querySelector(".blogTitle");
        const detailsSection = component.container.querySelector(".blogDetails");
        expect(titleSection).toHaveTextContent("Test Blog Test Author");
        expect(detailsSection).toHaveClass("hidden");
    });

    it("shows details when the button is clicked", () => {
        const detailsSection = component.container.querySelector(".blogDetails");
        const showDetailsBtn = component.getByText("show details");
        expect(detailsSection).toHaveClass("hidden");
        fireEvent.click(showDetailsBtn);
        expect(detailsSection).not.toHaveClass("hidden");
    });
});

describe("Likes functionality", () => {
    it("increments the likes when the like button is clicked", () => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "http://foo.bar",
            likes: 42,
            user: { id: 1, username: "root" }
        };
        const handleLike = jest.fn();
        const handleDelete = jest.fn();
        const component = render(
            <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        );
        const likeButton = component.getByText("Like");
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(handleLike).toHaveBeenCalledTimes(2);
    });
});
