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
        const result = await api.get("/api/blogs");
        expect(result.body).toHaveLength(helpers.blogs.length);
    });
});

afterAll(() => mongoose.connection.close());
