const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((acc, val) => acc + val.likes, 0);

const favorite = blogs => {
    if (blogs.length === 0) {
        return {};
    } else {
        const result = blogs.reduce(
            (max, val) => (val.likes > max.likes ? val : max),
            { likes: 0 }
        );
        return {
            title: result.title,
            author: result.author,
            likes: result.likes
        };
    }
};

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return {};
    } else {
        const authors = blogs.map(b => b.author);
        const likes = authors.map(a => {
            const articles = blogs.filter(b => b.author === a);
            return { author: a, blogs: articles.length };
        });
        return likes.reduce((max, val) => (val.blogs > max.blogs ? val : max), {
            blogs: 0
        });
    }
};

export default { dummy, totalLikes, favorite, mostBlogs };
