const getToken = (req, res, next) => {
    const authHeader = req.get("authorization");
    const token =
        authHeader && authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.slice(7)
            : null;
    req.token = token;
    next();
};

export default { getToken };
