import mongoose from "mongoose";
import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js";
import User from "../models/user.js";

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const testUser = new User({ username: "root", passwordHash });
    await testUser.save();
});

describe("user registration", () => {
    it("successfully creates a new user", async () => {
        const usersBefore = await User.find().exec();
        const newUser = { username: "Foobar", password: "FooBarBaz123" };
        await api
            .post("/api/user")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const usersAfter = await User.find().exec();
        expect(usersAfter).toHaveLength(usersBefore.length + 1);
        const usernames = usersAfter.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    it("fails with 400 when username is already taken", async () => {
        const usersBefore = await User.find().exec();
        const newUser = { username: "root", password: "FooBarBaz123" };
        const res = await api
            .post("/api/user")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        const usersAfter = await User.find().exec();
        expect(usersAfter).toHaveLength(usersBefore.length);
        expect(res.body.error).toContain("`username` to be unique");
    });

    it("fails with 400 when username is too short", async () => {
        const usersBefore = await User.find().exec();
        const newUser = { username: "fo", password: "FooBarBaz123" };
        const res = await api
            .post("/api/user")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        const usersAfter = await User.find().exec();
        expect(usersAfter).toHaveLength(usersBefore.length);
        expect(res.body.error).toContain(
            "shorter than the minimum allowed length"
        );
    });

    it("fails with 400 when password does not match requirements", async () => {
        const usersBefore = await User.find().exec();
        const newUsers = [
            { username: "foo", password: "Sh0rT" },
            { username: "bar", password: "NoNumbersInThisOne" },
            { username: "baz", password: "nocapitalletters123" },
            { username: "qux", password: "NOLOWERCASE123" }
        ];
        const failedUsers = newUsers.map(req =>
            api
                .post("/api/user")
                .send(req)
                .expect(400)
                .expect("Content-Type", /application\/json/)
        );
        const ret = await Promise.all(failedUsers);
        const usersAfter = await User.find().exec();
        expect(usersAfter).toHaveLength(usersBefore.length);
        ret.forEach(r => expect(r.body.error).toContain("password too weak"));
    });
});

afterAll(() => mongoose.connection.close());
