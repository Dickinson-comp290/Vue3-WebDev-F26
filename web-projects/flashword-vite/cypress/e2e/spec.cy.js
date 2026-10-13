describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check the initial answer count.
    cy.get('[data-cy="answer-count"]')
      .should('be.visible')
      .and('contain', 'You have answered 0 out of 3');
  });
});
