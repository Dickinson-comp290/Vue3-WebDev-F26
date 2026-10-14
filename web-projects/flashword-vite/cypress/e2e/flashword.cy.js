describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    //Check that the correct message is displayed.
    cy.get('[data-cy="scoreLineText"]').should(
      'contain',
      'You have answered 0 out of 3'
    );
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

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

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="gris-card"]')
      .should('not.have.class', 'correct')
      .should('be.visible')
      .find('[data-cy="translation"]')
      .should('have.value', '');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="uno-card"]')
      .should('not.have.class', 'correct')
      .find('[data-cy="translation"]')
      .should('have.value', '');
  });
});
