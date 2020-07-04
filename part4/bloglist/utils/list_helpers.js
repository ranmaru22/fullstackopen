const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((acc, val) => acc + val.likes, 0);

const favorite = blogs =>
    blogs.length === 0
        ? {}
        : blogs.reduce((max, val) => (val.likes > max.likes ? val : max), {
              likes: 0
          });

export default { dummy, totalLikes, favorite };
