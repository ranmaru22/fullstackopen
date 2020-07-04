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

export default { dummy, totalLikes, favorite };
