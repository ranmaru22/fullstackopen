describe("Blog app", () => {
    beforeEach(() => cy.resetAndRegister());

    it("shows the login form", () => {
        cy.get("#loginForm").as("loginForm").should("exist");
        cy.get("@loginForm").get("input#username").should("exist");
        cy.get("@loginForm").get("input#password").should("exist");
    });

    describe("Login", () => {
        it("succeeds with correct credentials", () => {
            cy.get("input#username").type("root");
            cy.get("input#password").type("Sekret123");
            cy.get("button[type='submit']").click();
            cy.contains("Logged in as root").should("exist");
        });

        it("fails with wrong credentials", () => {
            cy.get("input#username").type("root");
            cy.get("input#password").type("WrongPassword");
            cy.get("button[type='submit']").click();
            cy.contains("Logged in as root").should("not.exist");
            cy.contains("Error logging in").should("exist").should("have.class", "error-msg");
        });
    });

    describe("When logged in", () => {
        beforeEach(() => {
            cy.login({ username: "root", password: "Sekret123" });
            const testBlogs = [
                { title: "Foobar Blog", author: "Foo Bar", url: "http://foo.bar" },
                { title: "Barbaz Blog", author: "Bar Baz", url: "http://bar.baz" },
                { title: "Bazqux Blog", author: "Baz Qux", url: "http://baz.qux" }
            ];
            testBlogs.forEach(blog => cy.addBlog(blog));
            cy.visit("http://localhost:3000");
        });

        it("can create new blogs", () => {
            cy.contains("Add new Blog").click();
            const testBlog = {
                title: "Newly Added Blog",
                author: "Newly Added Author",
                url: "http://new.url"
            };
            cy.get("#addBlogForm").as("blogForm").should("exist");
            cy.get("@blogForm").get("input#title").type(testBlog.title);
            cy.get("@blogForm").get("input#author").type(testBlog.author);
            cy.get("@blogForm").get("input#url").type(testBlog.url);
            cy.get("@blogForm").get("button[type='submit']").click();
            cy.contains(`${testBlog.title} ${testBlog.author}`).should("exist");
        });

        it.only("can like blogs", () => {
            cy.contains("Foobar Blog").parent().find(".detailsBtn").click();
            cy.contains("Foobar Blog").parent().parent().find(".blogDetails").as("blogDetails");
            cy.get("@blogDetails").find(".likeBtn").click().click();
            cy.contains("Liked Foobar Blog")
                .should("exist")
                .should("have.class", "notification-msg");
            cy.get("@blogDetails").contains("2 likes").should("exist");
        });
    });
});
