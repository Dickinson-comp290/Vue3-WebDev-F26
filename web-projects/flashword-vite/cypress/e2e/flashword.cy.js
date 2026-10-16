describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    cy.visit('http://localhost:5173/');

    // Get the app-header element and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check the correct and total counts without depending on the message wording.
    cy.get('[data-cy="correct-count"] span').eq(0).should('have.text', '0');
    cy.get('[data-cy="correct-count"] span').eq(1).should('have.text', '3');

    // The completion message should not be displayed before all words are answered.
    cy.contains('Great work, you have completed all the words!').should(
      'not.exist'
    );
  });

  it('Check that a word card accepts an answer', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello')
      .should('have.value', 'hello');
  });

  it('Check that a correct answer marks its word card correct', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    cy.get('[data-cy="hola-card"]')
      .should('have.class', 'correct')
      .and('contain', 'hello');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('not.exist');
    cy.get('[data-cy="correct-count"] span').eq(0).should('have.text', '1');
  });

  it('Check that answering all words completes the game', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .type('one{enter}');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('grey{enter}');

    cy.get('#completed')
      .should('be.visible')
      .and('contain', 'Great work, you have completed all the words!');
    cy.get('[data-cy="correct-count"]').should('not.exist');
  });

  it('Check that resetting the game clears all answers', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .type('one{enter}');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('grey{enter}');

    cy.get('[data-cy="game-reset"]').click();

    cy.get('#completed').should('not.exist');
    cy.get('[data-cy="correct-count"] span').eq(0).should('have.text', '0');
    cy.get('[data-cy="correct-count"] span').eq(1).should('have.text', '3');
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="uno-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="gris-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="hola-card"] [data-cy="translation"]').should(
      'have.value',
      ''
    );
    cy.get('[data-cy="uno-card"] [data-cy="translation"]').should(
      'have.value',
      ''
    );
    cy.get('[data-cy="gris-card"] [data-cy="translation"]').should(
      'have.value',
      ''
    );
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // check that hola-card does not have the css class correct.
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

    cy.get('[data-cy="uno-card"]').should('be.visible');
    cy.get('[data-cy="uno-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="gris-card"]').should('be.visible');
    cy.get('[data-cy="gris-card"]').should('not.have.class', 'correct');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');
  });
});
