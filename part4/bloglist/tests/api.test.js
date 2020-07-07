import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import helpers from "./test_helpers.js";

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
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
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        await api.post("/api/blogs").send(newPost).expect(201);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body.length).toBe(helpers.blogs.length + 1);
        expect(allEntries.body).toContainEqual(
            expect.objectContaining(newPost)
        );
        done();
    });

    it("initializes likes to 0 if not provided", async done => {
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        const result = await api.post("/api/blogs").send(newPost).expect(201);
        expect(result.body.likes).toBe(0);
        done();
    });

    it("responds with 400 if title or URL are missing in POST", async done => {
        const postWithoutTitle = {
            author: "Some dude",
            url: "http://foo.bar"
        };
        const postWithoutUrl = {
            author: "Some dude",
            title: "Sample post"
        };
        await api.post("/api/blogs").send(postWithoutTitle).expect(400);
        await api.post("/api/blogs").send(postWithoutUrl).expect(400);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body.length).toBe(helpers.blogs.length);
        done();
    });
});

describe("deleting blog posts", () => {
    it("returns 404 on a DELETE request to an invalid ID", async done => {
        const invalidId = "12345abcdef";
        await api.delete(`/api/blogs/${invalidId}`).expect(404);
        done();
    });

    it("deletes a post on a valid DELETE request", async done => {
        const id = helpers.blogs[0]._id;
        await api.delete(`/api/blogs/${id}`).expect(204);
        const allEntries = await api.get("/api/blogs").expect(200);
        expect(allEntries.body.length).toBe(helpers.blogs.length - 1);
        done();
    });
});

describe("updating blog posts", () => {
    it("returns 404 on a PATCH request to an invalid ID", async done => {
        const invalidId = "12345abcdef";
        const patch = { likes: 99 };
        await api.patch(`/api/blogs/${invalidId}`).send(patch).expect(404);
        done();
    });

    it("updates a post on a valid PATCH request", async done => {
        const id = helpers.blogs[0]._id;
        const patch = { likes: 99 };
        const patchedBlog = await api
            .patch(`/api/blogs/${id}`)
            .send(patch)
            .expect(200);
        const expected = { id, ...patch };
        expect(patchedBlog.body).toStrictEqual(
            expect.objectContaining(expected)
        );
        done();
    });
});

afterAll(() => mongoose.connection.close());
