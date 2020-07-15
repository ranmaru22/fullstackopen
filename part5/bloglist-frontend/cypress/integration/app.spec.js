describe("Blog app", () => {
    beforeEach(() => {
        cy.resetAndRegister();
        cy.visit("http://localhost:3000");
    });

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

        it("can like blogs", () => {
            cy.contains("Foobar Blog").parent().find(".detailsBtn").click();
            cy.contains("Foobar Blog").parent().parent().find(".blogDetails").as("blogDetails");
            cy.get("@blogDetails").find(".likeBtn").click().click();
            cy.contains("Liked Foobar Blog")
                .should("exist")
                .should("have.class", "notification-msg");
            cy.get("@blogDetails").contains("2 likes").should("exist");
        });

        it("can delete own blogs", () => {
            cy.contains("Foobar Blog").parent().find(".detailsBtn").click();
            cy.contains("Foobar Blog").parent().parent().find(".deleteBtn").click();
            cy.contains("Deleted Foobar Blog")
                .should("exist")
                .should("have.class", "notification-msg");
            cy.contains("Foobar Blog").should("not.exist");
        });

        it("cannot delete other people's blogs", () => {
            cy.get("#logoutBtn").click();
            cy.addUser({ username: "new", password: "Sekret456" });
            cy.login({ username: "new", password: "Sekret456" });
            cy.visit("http://localhost:3000");
            cy.contains("Foobar Blog").parent().find(".detailsBtn").click();
            cy.contains("Foobar Blog").parent().parent().find(".deleteBtn").click();
            cy.contains("Error deleting Foobar Blog")
                .should("exist")
                .should("have.class", "error-msg");
            cy.contains("Foobar Blog").should("exist");
        });

        it("orders the blogs dynamically by likes descending", () => {
            cy.get(".detailsBtn").click({ multiple: true });
            cy.get("#blogs").should(ret => {
                const blogs = Array.from(ret[0].childNodes).map(n => n.firstChild.innerText);
                expect(blogs[0]).to.match(/Foobar Blog/);
                expect(blogs[1]).to.match(/Barbaz Blog/);
                expect(blogs[2]).to.match(/Bazqux Blog/);
            });

            cy.contains("Foobar Blog").parent().parent().find(".blogDetails").as("fooBlog");
            cy.get("@fooBlog").find(".likeBtn").click().click();
            cy.contains("Barbaz Blog").parent().parent().find(".blogDetails").as("barBlog");
            cy.get("@barBlog").find(".likeBtn").click().click().click();
            cy.contains("Bazqux Blog").parent().parent().find(".blogDetails").as("bazBlog");
            cy.get("@bazBlog").find(".likeBtn").click().click().click().click().click();

            cy.get("#blogs").should(ret => {
                const blogs = Array.from(ret[0].childNodes).map(n => n.firstChild.innerText);
                expect(blogs[0]).to.match(/Bazqux Blog/);
                expect(blogs[1]).to.match(/Barbaz Blog/);
                expect(blogs[2]).to.match(/Foobar Blog/);
            });
        });
    });
});
