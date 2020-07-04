import listHelpers from "../utils/list_helpers.js";

test("dummy returns one", () => {
    const blogs = [];
    const result = listHelpers.dummy(blogs);
    expect(result).toBe(1);
});
