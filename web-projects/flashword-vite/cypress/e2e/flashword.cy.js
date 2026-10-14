describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');
    cy.get('[data-cy="app-countdisplay"]').should(
      'contain',
      'You have answered 0 out of 3'
    );
  });
});
