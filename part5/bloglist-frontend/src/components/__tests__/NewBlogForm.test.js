import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import NewBlogForm from "../NewBlogForm";

describe("Adding new blogs", () => {
    it("Passes the correct values to the event handler", async () => {
        const handleAdd = jest.fn(() => Promise.resolve());
        const component = render(<NewBlogForm handleAdd={handleAdd} />);

        const form = component.container.querySelector("#addBlogForm");
        const titleField = component.container.querySelector("#title");
        const authorField = component.container.querySelector("#author");
        const urlField = component.container.querySelector("#url");

        const expected = { title: "Foo", author: "Bar", url: "Baz" };
        fireEvent.change(titleField, { target: { value: expected.title } });
        fireEvent.change(authorField, { target: { value: expected.author } });
        fireEvent.change(urlField, { target: { value: expected.url } });
        fireEvent.submit(form);

        expect(handleAdd).toHaveBeenCalledTimes(1);
        expect(handleAdd).toHaveBeenCalledWith(expected);

        await act(() => Promise.resolve());
    });
});
