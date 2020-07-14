describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        const testUser = { username: "root", password: "Sekret123" };
        cy.request("POST", "http://localhost:3001/api/user", testUser).then(res => {
            localStorage.setItem("blogAppUser", JSON.stringify(res.body));
            cy.visit("http://localhost:3000");
            cy.get("#logoutBtn").click();
        });
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
});
