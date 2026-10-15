describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');
    // use data-cy to check the total instead of depending on the text only (avoid brittle test)
    cy.get('[data-cy="correct-count"]').should('have.text', '0');
    cy.get('[data-cy="total-count"]').should('have.text', '3');

    // check that the "great work,...." notification will not appear when we start
    cy.contains('Great work, you have completed all the words!').should(
      'not.exist'
    );
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

    // 1. check 'hola'
    cy.get('[data-cy="hola-card"]').should('be.visible');
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .and('contain', 'hola');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .and('have.value', '');

    // 2. check 'uno'
    cy.get('[data-cy="uno-card"]').should('be.visible');
    cy.get('[data-cy="uno-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .and('contain', 'uno');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .and('have.value', '');

    // 3. check 'gris'
    cy.get('[data-cy="gris-card"]').should('be.visible');
    cy.get('[data-cy="gris-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .and('contain', 'gris');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .and('have.value', '');
  });
  it('Allows typing an answer and checking it', () => {
    cy.visit('http://localhost:5173/');

    // type the correct translation of "hola" and press enter
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    // Verify that the card's state updates to 'correct'
    cy.get('[data-cy="hola-card"]').should('have.class', 'correct');

    // Verify that the score message updates to '1 out of 3'
    cy.contains('You have answered 1 out of 3').should('be.visible');
  });

  it('Allows typing a word into a WordCard text field', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello')
      .should('have.value', 'hello');
  });
});
