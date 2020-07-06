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

describe("API tests", () => {
    it("connects to the database", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("returns notes from the database", async () => {
        const result = await api.get("/api/blogs").expect(200);
        expect(result.body).toHaveLength(helpers.blogs.length);
    });

    it("returns the ID identifier as id instead of _id", async () => {
        const result = await api.get("/api/blogs").expect(200);
        result.body.forEach(x => {
            expect(x.id).toBeDefined();
        });
    });

    it("crates a new blog post from a valid POST request", async () => {
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
    });

    it("initializes likes to 0 if not provided", async () => {
        const newPost = {
            author: "Some dude",
            title: "Sample post",
            url: "http://foo.bar"
        };
        const result = await api.post("/api/blogs").send(newPost).expect(201);
        expect(result.body.likes).toBe(0);
    });

    it("responds with 400 if title or URL are missing in POST", async () => {
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
    });
});

afterAll(() => mongoose.connection.close());
