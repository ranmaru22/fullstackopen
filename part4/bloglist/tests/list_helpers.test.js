import listHelpers from "../utils/list_helpers.js";
import helpers from "./test_helpers.js";

test("dummy returns one", () => {
    const blogs = [];
    const result = listHelpers.dummy(blogs);
    expect(result).toBe(1);
});

describe("totalLikes function", () => {
    test("when list has only one blog it returns the likes of that", () => {
        const result = listHelpers.totalLikes(helpers.listWithOneBlog);
        expect(result).toBe(5);
    });

    test("when list has multiple blogs, it returns the sum of their likes", () => {
        const result = listHelpers.totalLikes(helpers.blogs);
        expect(result).toBe(36);
    });

    test("when the list is empty, it returns 0", () => {
        const result = listHelpers.totalLikes([]);
        expect(result).toBe(0);
    });
});

describe("favorite function", () => {
    test("when list has only one entry, it returns that entry", () => {
        const result = listHelpers.favorite(helpers.listWithOneBlog);
        const ret = { ...helpers.listWithOneBlog[0] };
        expect(result).toStrictEqual({
            title: ret.title,
            author: ret.author,
            likes: ret.likes
        });
    });

    test("when the list has many entries, it returns the one with the most likes", () => {
        const result = listHelpers.favorite(helpers.blogs);
        const ret = { ...helpers.blogs[2] };
        expect(result).toStrictEqual({
            title: ret.title,
            author: ret.author,
            likes: ret.likes
        });
    });

    test("when the list is empty, it returns an empty object", () => {
        const result = listHelpers.favorite([]);
        expect(result).toStrictEqual({});
    });
});

describe("most blogs function", () => {
    test("when list has one entry, it returns the author of that entry", () => {
        const result = listHelpers.mostBlogs(helpers.listWithOneBlog);
        const ret = { ...helpers.listWithOneBlog[0] };
        expect(result).toStrictEqual({ author: ret.author, blogs: 1 });
    });

    test("when the list has many entries, it returns the author with the most blogs", () => {
        const result = listHelpers.mostBlogs(helpers.blogs);
        const ret = { author: "Robert C. Martin", blogs: 3 };
        expect(result).toStrictEqual(ret);
    });

    test("when the list is empty, it returns an empty object", () => {
        const result = listHelpers.mostBlogs([]);
        expect(result).toStrictEqual({});
    });
});

describe("most likes function", () => {
    test("when list has one entry, it returns the author of that entry", () => {
        const result = listHelpers.mostLikes(helpers.listWithOneBlog);
        const ret = { ...helpers.listWithOneBlog[0] };
        expect(result).toStrictEqual({ author: ret.author, likes: ret.likes });
    });

    test("when the list has many entries, it returns the author with the most blogs", () => {
        const result = listHelpers.mostLikes(helpers.blogs);
        const ret = { author: "Edsger W. Dijkstra", likes: 17 };
        expect(result).toStrictEqual(ret);
    });

    test("when the list is empty, it returns an empty object", () => {
        const result = listHelpers.mostLikes([]);
        expect(result).toStrictEqual({});
    });
});
