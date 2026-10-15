describe('FlashWord Tests', () => {
  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');
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
  });
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');
    cy.get('[data-cy="app-countdisplay"]').should(
      'contain',
      'You have answered 0 out of 3'
    );
    cy.get('[data-cy="completed"]').should('not.exist');
  });
  it('Check initial page state', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[type="text"]').should('be.visible');
  });
});
