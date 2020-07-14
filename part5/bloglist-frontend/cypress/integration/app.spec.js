describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        cy.visit("http://localhost:3000");
    });

    it("shows the login form", () => {
        cy.get("#loginForm").as("loginForm").should("exist");
        cy.get("@loginForm").get("input#username").should("exist");
        cy.get("@loginForm").get("input#password").should("exist");
    });
});
