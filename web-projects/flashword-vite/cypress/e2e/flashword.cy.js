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
    cy.get('[data-cy="app-countdisplay"]')
      .find('span')
      .eq(0)
      .should('contain', '0');
    cy.get('[data-cy="app-countdisplay"]')
      .find('span')
      .eq(1)
      .should('contain', '3');
    cy.get('[data-cy="completed"]').should('not.exist');
  });
  it('Check initial page state', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[type="text"]').should('be.visible');
  });
  it('shows a word card as correct after entering the right translation', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    cy.get('[data-cy="hola-card"]')
      .should('have.class', 'correct')
      .find('.correctAnswer')
      .should('be.visible')
      .and('contain', 'hello');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('not.exist');
    cy.get('[data-cy="app-countdisplay"]').should('contain', '1');
  });
  it('shows the completion message after all words are answered correctly', () => {
    cy.visit('http://localhost:5173/');

    [
      ['hola', 'hello'],
      ['uno', 'one'],
      ['gris', 'grey'],
    ].forEach(([word, translation]) => {
      cy.get(`[data-cy="${word}-card"]`)
        .find('[data-cy="translation"]')
        .type(`${translation}{enter}`);
    });

    cy.get('#completed')
      .should('be.visible')
      .and('contain', 'Great work, you have completed all the words!');
  });
});
