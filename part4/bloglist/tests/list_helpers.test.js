import listHelpers from "../utils/list_helpers.js";

const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
];

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url:
            "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url:
            "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

test("dummy returns one", () => {
    const blogs = [];
    const result = listHelpers.dummy(blogs);
    expect(result).toBe(1);
});

describe("totalLikes function", () => {
    test("when list has only one blog it returns the likes of that", () => {
        const result = listHelpers.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test("when list has multiple blogs, it returns the sum of their likes", () => {
        const result = listHelpers.totalLikes(blogs);
        expect(result).toBe(36);
    });
});

describe("favorite function", () => {
    test("when list has only one entry, it returns that entry", () => {
        const result = listHelpers.favorite(listWithOneBlog);
        const ret = { ...listWithOneBlog[0] };
        expect(result).toStrictEqual({
            title: ret.title,
            author: ret.author,
            likes: ret.likes
        });
    });

    test("when the list has many entries, it returns the one with the most likes", () => {
        const result = listHelpers.favorite(blogs);
        const ret = { ...blogs[2] };
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
        const result = listHelpers.mostBlogs(listWithOneBlog);
        const ret = { ...listWithOneBlog[0] };
        expect(result).toStrictEqual({ author: ret.author, blogs: 1 });
    });

    test("when the list has many entries, it returns the author with the most blogs", () => {
        const result = listHelpers.mostBlogs(blogs);
        const ret = { author: "Robert C. Martin", blogs: 3 };
        expect(result).toStrictEqual(ret);
    });

    test("when the list is empty, it returns an empty object", () => {
        const result = listHelpers.mostBlogs([]);
        expect(result).toStrictEqual({});
    });
});
