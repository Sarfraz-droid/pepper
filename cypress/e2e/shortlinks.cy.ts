describe('Dashboard', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.document.cookie = 'token=8da193366e1554c08b2870c50f737b9587c3372b656151c4a96028af26f51334; path=/admin;'
        })

    })

    it('should visit dashboard', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);

        cy.url().should('eq', `${Cypress.env("LOCAL_URL")}/admin`);        
    })

    it('create shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);

        cy.wait(1000);

        cy.get('button[data-testid="create-shortlink"]').should('exist').click()        

        cy.get('input[data-testid="shortlink-input"]').should('exist').clear().type('test_shortlink')

        cy.get('input[data-testid="longlink-input"]').should('exist').clear().type('https://www.google.com')

        cy.get('button[data-testid="save-shortlink"]').should('exist').click()

        cy.wait(1000);

    })

    it('test shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/test_shortlink`);

        cy.url().should('eq', 'https://www.google.com/');
    })

    it('cancel shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);

        cy.wait(1000);

        cy.get('button[data-testid="edit-test_shortlink"]').should('exist').click()

        cy.get('button[data-testid="cancel-shortlink"]').should('exist').click()
    })    

    it('edit shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);

        cy.wait(1000);

        cy.get('button[data-testid="edit-test_shortlink"]').click()

        cy.get('input[data-testid="shortlink-input"]').should('exist').clear().type('test_shortlink_edit')

        cy.get('input[data-testid="longlink-input"]').should('exist').clear().type('https://www.google.com')

        cy.get('button[data-testid="save-shortlink"]').should('exist').click()

        cy.wait(1000);
    })

    it('test shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/test_shortlink_edit`);

        cy.url().should('eq', 'https://www.google.com/');
    })



    it('delete shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);

        cy.wait(1000);

        cy.get('button[data-testid="delete-test_shortlink_edit"]').click()
        
        cy.get('button[data-testid="confirm-delete-link"]').click()

        cy.wait(1000);

        cy.get('button[data-testid="delete-test_shortlink_edit"]').should('not.exist')
    })
});