describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    cy.get('p').should('contain', `0`);
    cy.get('p').should('contain', `3`);
    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');

    cy.get('[data-cy="uno-card"]').should('be.visible');
    cy.get('[data-cy="uno-card"]').should('not.have.class', 'correct');

    cy.get('[data-cy="gris-card"]').should('be.visible');
    cy.get('[data-cy="gris-card"]').should('not.have.class', 'correct');

    // Check that the hola-card is displaying the correct word.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'hola');
    // Check that the hola-card input field is empty.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="app-header"]').should(
      'not.contain',
      'Great work, you have completed all the words!'
    );
  });

  it('Check answer', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello')
      .should('have.value', 'hello');
  });
});
