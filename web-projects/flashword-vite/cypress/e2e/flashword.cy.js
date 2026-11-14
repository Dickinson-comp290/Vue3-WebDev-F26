describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    cy.visit('http://localhost:5173/');

    // Get the app-header element and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    cy.get('[data-cy="correct-count-value"]').should('have.text', '0');
    cy.get('[data-cy="word-count-value"]').should('have.text', '3');
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

  it('Types a word into a WordCard text field', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hola answer')
      .should('have.value', 'hola answer');
  });

  it('Updates the correct count after a correct answer', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    cy.get('[data-cy="correct-count-value"]').should('have.text', '1');
    cy.get('[data-cy="word-count-value"]').should('have.text', '3');
  });

  it('Marks a card correct after the correct translation is entered', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    cy.get('[data-cy="hola-card"]')
      .should('have.class', 'correct')
      .find('.correctAnswer')
      .should('have.text', 'hello');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('not.exist');
  });

  it('Shows the completion message when all words are answered correctly', () => {
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

  it('Resets the score and all cards to their initial state', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');
    cy.get('[data-cy="correct-count-value"]').should('have.text', '1');

    cy.get('[data-cy="reset"]').click();

    cy.get('[data-cy="correct-count-value"]').should('have.text', '0');
    cy.get('[data-cy="word-count-value"]').should('have.text', '3');
    cy.get('[data-cy="hola-card"]')
      .should('not.have.class', 'correct')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .and('have.value', '');
  });
});
