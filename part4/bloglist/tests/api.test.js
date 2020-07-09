import mongoose from "mongoose";
import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import helpers from "./test_helpers.js";

const api = supertest(app);

const getToken = async () => {
    const user = await api
        .post("/api/login")
        .send({ username: "root", password: "sekret" });
    return user.body.token;
};

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const testUser = new User({ username: "root", passwordHash });
    await testUser.save();
    const blogsToBeSaved = helpers.blogs.map(b => new Blog(b).save());
    await Promise.all(blogsToBeSaved);
});

describe("basic connection", () => {
    it("connects to the database", async done => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        done();
    });

    it("returns blogs from the database", async done => {
        const result = await api.get("/api/blogs").expect(200);
        expect(result.body).toHaveLength(helpers.blogs.length);
        done();
    });

    it("returns the ID identifier as id instead of _id", async done => {
        const result = await api.get("/api/blogs").expect(200);
        result.body.forEach(x => {
            expect(x.id).toBeDefined();
        });
        done();
    });
});

describe("adding blog posts", () => {
    it("crates a new blog post from a valid POST request", async done => {
        const token = await getToken();
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newPost)
            .expect(201);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body).toHaveLength(helpers.blogs.length + 1);
        expect(allEntries.body).toContainEqual(
            expect.objectContaining(newPost)
        );
        done();
    });

    it("initializes likes to 0 if not provided", async done => {
        const token = await getToken();
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        const result = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newPost)
            .expect(201);
        expect(result.body.likes).toBe(0);
        done();
    });

    it("responds with 400 if title or URL are missing in POST", async done => {
        const token = await getToken();
        const invalidPosts = [
            {
                author: "No Title",
                url: "http://foo.bar"
            },
            {
                author: "Some dude",
                title: "No URL"
            }
        ];
        const results = invalidPosts.map(p =>
            api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${token}`)
                .send(p)
                .expect(400)
        );
        await Promise.all(results);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body).toHaveLength(helpers.blogs.length);
        done();
    });

    it("responds with 401 on invalid token", async done => {
        const token = await getToken();
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token.slice(-2)}ab`)
            .send(newPost)
            .expect(401);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body).toHaveLength(helpers.blogs.length);
        done();
    });

    it("responds with 401 on missing token", async done => {
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        await api.post("/api/blogs").send(newPost).expect(401);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body).toHaveLength(helpers.blogs.length);
        done();
    });
});

describe("deleting blog posts", () => {
    it("returns 404 on a DELETE request to an invalid ID", async done => {
        const token = await getToken();
        const invalidId = "12345abcdef";
        await api
            .delete(`/api/blogs/${invalidId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404);
        done();
    });

    it("returns 401 on a DELETE request with a token mismatch", async done => {
        const token = await getToken();
        const id = helpers.blogs[0]._id;
        await api
            .delete(`/api/blogs/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body).toHaveLength(helpers.blogs.length);
        done();
    });

    it("deletes a post on a valid DELETE request", async done => {
        const token = await getToken();
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        const savedPost = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newPost)
            .expect(201);
        const entriesBefore = await api.get("/api/blogs").expect(200);
        await api
            .delete(`/api/blogs/${savedPost.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);
        const entriesAfter = await api.get("/api/blogs").expect(200);
        expect(entriesAfter.body).toHaveLength(entriesBefore.body.length - 1);
        done();
    });
});

describe("updating blog posts", () => {
    it("returns 404 on a PATCH request to an invalid ID", async done => {
        const token = await getToken();
        const invalidId = "12345abcdef";
        const patch = { likes: 99 };
        await api
            .patch(`/api/blogs/${invalidId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(patch)
            .expect(404);
        done();
    });

    it("returns 401 on a PATCH request with a token mismatch", async done => {
        const token = await getToken();
        const id = helpers.blogs[0]._id;
        const patch = { likes: 99 };
        await api
            .patch(`/api/blogs/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(patch)
            .expect(401);
        const blogInQuestion = await api.get(`/api/blogs/${id}`).expect(200);
        const expected = { id, likes: helpers.blogs[0].likes };
        expect(blogInQuestion.body).toStrictEqual(
            expect.objectContaining(expected)
        );
        done();
    });

    it("updates a post on a valid PATCH request", async done => {
        const token = await getToken();
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar",
            likes: 1
        };
        const savedPost = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newPost)
            .expect(201);
        const patch = { likes: 99 };
        const patchedBlog = await api
            .patch(`/api/blogs/${savedPost.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(patch)
            .expect(200);
        const expected = { id: savedPost.body.id, ...patch };
        expect(patchedBlog.body).toStrictEqual(
            expect.objectContaining(expected)
        );
        done();
    });
});

afterAll(() => mongoose.connection.close());
