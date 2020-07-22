// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("addUser", ({ username, password }) => {
    cy.request("POST", "http://localhost:3001/api/user", { username, password });
});

Cypress.Commands.add("resetAndRegister", () => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.addUser({ username: "root", password: "Sekret123" });
});

Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3001/api/login", { username, password }).then(res => {
        localStorage.setItem("blogAppUser", JSON.stringify(res.body));
    });
});

Cypress.Commands.add("addBlog", blog => {
    cy.request({
        url: "http://localhost:3001/api/blogs",
        method: "POST",
        body: blog,
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("blogAppUser")).token}`
        }
    });
});
