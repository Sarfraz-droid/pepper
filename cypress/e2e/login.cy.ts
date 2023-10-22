describe('login', () => {
  it('login', () => {
    cy.visit(`${Cypress.env("LOCAL_URL")}/admin/login`)

    cy.get('input[data-testid="username"]').type('admin');
    cy.get('input[data-testid="password"]').type('admin');

    cy.get('button[data-testid="login"]').click();

    cy.wait(3000);

    cy.url().should('eq', `${Cypress.env("LOCAL_URL")}/admin`);
  })
})