export const initializeBlogs = () => ({ type: "INIT_BLOGS" });

export const createNewBlog = (newBlog, token) => ({ type: "ADD_BLOG", newBlog, token });

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_BLOGS_SUCCESS":
            return action.payload;
        case "ADD_BLOG_SUCCESS":
            return state.concat(action.payload);
        case "ADD_BLOG_ERROR":
        case "INIT_BLOGS_ERROR":
            console.error(action.message);
            return state;
        default:
            return state;
    }
};

export default reducer;
