describe('Modal State Bug Fix', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.document.cookie = 'token=8da193366e1554c08b2870c50f737b9587c3372b656151c4a96028af26f51334; path=/admin;'
        })
        cy.wait(1000)
    })

    it('should show correct data when editing different shortlinks', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);
        cy.wait(1000);

        // Create first shortlink
        cy.get('button[data-testid="create-shortlink"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('exist').clear().type('first_link')
        cy.get('textarea[data-testid="longlink-input"]').should('exist').clear().type('https://first.com')
        cy.get('button[data-testid="save-shortlink"]').should('exist').click()
        cy.wait(1000);

        // Create second shortlink
        cy.get('button[data-testid="create-shortlink"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('exist').clear().type('second_link')
        cy.get('textarea[data-testid="longlink-input"]').should('exist').clear().type('https://second.com')
        cy.get('button[data-testid="save-shortlink"]').should('exist').click()
        cy.wait(1000);

        // Edit first link - verify it shows correct data
        cy.get('button[data-testid="edit-first_link"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('have.value', 'first_link')
        cy.get('textarea[data-testid="longlink-input"]').should('have.value', 'https://first.com')
        cy.get('button[data-testid="cancel-shortlink"]').should('exist').click()
        cy.wait(500);

        // Edit second link - verify it shows correct data (not first link's data)
        cy.get('button[data-testid="edit-second_link"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('have.value', 'second_link')
        cy.get('textarea[data-testid="longlink-input"]').should('have.value', 'https://second.com')
        cy.get('button[data-testid="cancel-shortlink"]').should('exist').click()
        cy.wait(500);

        // Clean up - delete both links
        cy.get('button[data-testid="delete-first_link"]').click()
        cy.get('button[data-testid="confirm-delete-link"]').click()
        cy.wait(500);

        cy.get('button[data-testid="delete-second_link"]').click()
        cy.get('button[data-testid="confirm-delete-link"]').click()
        cy.wait(500);
    })

    it('should show correct data for newly created shortlink', () => {
        cy.visit(`${Cypress.env("LOCAL_URL")}/admin`);
        cy.wait(1000);

        // Create a shortlink
        cy.get('button[data-testid="create-shortlink"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('exist').clear().type('new_link')
        cy.get('textarea[data-testid="longlink-input"]').should('exist').clear().type('https://new.com')
        cy.get('button[data-testid="save-shortlink"]').should('exist').click()
        cy.wait(1000);

        // Immediately edit the new shortlink - it should show the correct data
        cy.get('button[data-testid="edit-new_link"]').should('exist').click()
        cy.get('input[data-testid="shortlink-input"]').should('have.value', 'new_link')
        cy.get('textarea[data-testid="longlink-input"]').should('have.value', 'https://new.com')
        cy.get('button[data-testid="cancel-shortlink"]').should('exist').click()
        cy.wait(500);

        // Clean up
        cy.get('button[data-testid="delete-new_link"]').click()
        cy.get('button[data-testid="confirm-delete-link"]').click()
        cy.wait(500);
    })
});
