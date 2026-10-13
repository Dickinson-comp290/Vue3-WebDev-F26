describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('h1').should('contain', 'FlashWord');

    // Check the initial answer count.
    cy.contains('You have answered 0 out of 3').should('be.visible');
  });
});
