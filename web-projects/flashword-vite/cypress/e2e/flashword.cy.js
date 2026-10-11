describe('FlashWord Tests', () => {
  it('Check initial state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header using its data-cy property instead of the h1 element.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check that the initial score/progress message is displayed correctly.
    cy.contains('You have answered 0 out of 3').should('be.visible');
  });
});
