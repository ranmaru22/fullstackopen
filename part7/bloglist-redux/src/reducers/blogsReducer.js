export const initializeBlogs = () => ({ type: "INIT_BLOGS" });

export const createNewBlog = (newBlog, token) => ({ type: "ADD_BLOG", newBlog, token });

export const deleteBlog = (id, token) => ({ type: "DEL_BLOG", id, token });

export const addNewComment = (newComment, token) => ({ type: "ADD_COMMENT", newComment, token });

export const likeBlog = (id, patch, token) => ({ type: "LIKE_BLOG", id, patch, token });

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_BLOGS_SUCCESS":
            return action.payload;
        case "ADD_BLOG_SUCCESS":
            return state.concat(action.payload);
        case "DEL_BLOG_SUCCESS":
            return state.filter(b => b.id !== action.id);
        case "ADD_COMMENT_SUCCESS":
            return state.map(b => (b.id === action.blog ? { ...b, comments: action.payload } : b));
        case "LIKE_BLOG_SUCCESS":
            return state.map(b => (b.id === action.payload.id ? action.payload : b));
        case "INIT_BLOGS_ERROR":
        case "ADD_BLOG_ERROR":
        case "DEL_BLOG_ERROR":
        case "ADD_COMMENT_ERROR":
        case "LIKE_BLOG_ERROR":
            console.error(action.message);
            return state;
        default:
            return state;
    }
};

export default reducer;
