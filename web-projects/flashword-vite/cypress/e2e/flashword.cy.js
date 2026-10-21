describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    cy.get('p').should('contain', `0`);
    cy.get('p').should('contain', `3`);
    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');

    cy.get('[data-cy="uno-card"]').should('be.visible');
    cy.get('[data-cy="uno-card"]').should('not.have.class', 'correct');

    cy.get('[data-cy="gris-card"]').should('be.visible');
    cy.get('[data-cy="gris-card"]').should('not.have.class', 'correct');

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

    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    cy.get('[data-cy="app-header"]').should(
      'not.contain',
      'Great work, you have completed all the words!'
    );
  });

  it('Check answer', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello')
      .should('have.value', 'hello');
  });

  it('Updates the UI after a correct answer', () => {
    cy.visit('http://localhost:5173/');

    // Enter the correct translation and submit it with Enter.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    // A correct answer marks the card and replaces its input with the answer.
    cy.get('[data-cy="hola-card"]').should('have.class', 'correct');
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('not.exist');
    cy.get('[data-cy="hola-card"]')
      .find('.correctAnswer')
      .should('be.visible')
      .and('have.text', 'hello');

    // The score increases by one while the total number of words stays the same.
    cy.get('#correctCount span').eq(0).should('have.text', '1');
    cy.get('#correctCount span').eq(1).should('have.text', '3');
  });

  it('Displays the win message after all words are answered correctly', () => {
    cy.visit('http://localhost:5173/');

    // Submit the correct translation for each word to complete the game.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .type('one{enter}');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('grey{enter}');

    // Completing all three words replaces the score with the win message.
    cy.get('#completed')
      .should('be.visible')
      .and('contain.text', 'Great work, you have completed all the words!');
    cy.get('#correctCount').should('not.exist');
  });

  it('Displays the reset button in the bottom-right corner', () => {
    cy.visit('http://localhost:5173/');

    // The reset control stays visible and fixed 16px from the viewport edges.
    cy.get('[data-cy="reset-button"]')
      .should('be.visible')
      .and('contain.text', 'Reset Game')
      .and('have.css', 'position', 'fixed')
      .and('have.css', 'right', '16px')
      .and('have.css', 'bottom', '16px');
  });

  it('Clears entered guesses when reset is clicked before answering', () => {
    cy.visit('http://localhost:5173/');

    // Fill the cards without submitting any guesses.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('greetings');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .type('number');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('color');

    cy.get('#correctCount span').eq(0).should('have.text', '0');
    cy.get('[data-cy="reset-button"]').click();

    // Reset clears all unsubmitted guesses and leaves the score unchanged.
    ['hola', 'uno', 'gris'].forEach((word) => {
      cy.get(`[data-cy="${word}-card"]`)
        .find('[data-cy="translation"]')
        .should('be.visible')
        .and('have.value', '');
    });
    cy.get('#correctCount span').eq(0).should('have.text', '0');
  });

  it('Resets the board to start a new game', () => {
    cy.visit('http://localhost:5173/');

    // Win the game so reset must clear both the completed state and card answers.
    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .type('one{enter}');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('grey{enter}');
    cy.get('#completed').should('be.visible');

    cy.get('[data-cy="reset-button"]').click();

    // The new game starts at zero, with all cards ready for answers again.
    cy.get('#completed').should('not.exist');
    cy.get('#correctCount span').eq(0).should('have.text', '0');
    cy.get('#correctCount span').eq(1).should('have.text', '3');
    ['hola', 'uno', 'gris'].forEach((word) => {
      cy.get(`[data-cy="${word}-card"]`)
        .should('be.visible')
        .and('not.have.class', 'correct')
        .find('[data-cy="translation"]')
        .should('be.visible')
        .and('have.value', '');
    });
  });
});
