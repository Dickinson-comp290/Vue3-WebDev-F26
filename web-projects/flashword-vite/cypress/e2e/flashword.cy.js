describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    //Check that the correct message is displayed.
    cy.get('[data-cy="correctCount"]').should('contain', '0');
    cy.get('[data-cy="wordCount"]').should('contain', '3');
    cy.contains('Great work, you have completed all the words!').should(
      'not.exist'
    );
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

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

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="gris-card"]')
      .should('not.have.class', 'correct')
      .should('be.visible')
      .find('[data-cy="translation"]')
      .should('have.value', '');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="uno-card"]')
      .should('not.have.class', 'correct')
      .find('[data-cy="translation"]')
      .should('have.value', '');
  });
  it('Check word card typing', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="uno-card"]').find('[data-cy="translation"]').type('one');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('have.value', 'one');
  });

  it('Denotes a word as correct after entering the right translation', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="uno-card"]')
      .should('not.have.class', 'correct')
      .should('have.css', 'background-color', 'rgb(232, 240, 255)')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
      .find('[data-cy="translation"]')
      .type('one{enter}');

    cy.get('[data-cy="uno-card"]')
      .should('have.class', 'correct')
      .should('have.css', 'background-color', 'rgb(209, 231, 221)')
      .should('have.css', 'color', 'rgb(15, 81, 50)')
      .find('.correctAnswer')
      .should('be.visible')
      .and('contain', 'one');
    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('not.exist');
    cy.get('[data-cy="correctCount"]').should('contain', '1');
  });

  it('Updates the interface when all words are answered correctly', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"] [data-cy="translation"]').type(
      'hello{enter}'
    );
    cy.get('[data-cy="uno-card"] [data-cy="translation"]').type('one{enter}');
    cy.get('[data-cy="gris-card"] [data-cy="translation"]').type('grey{enter}');

    cy.contains('Great work, you have completed all the words!')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(15, 81, 50)');
    cy.get('[data-cy="scoreLineText"]').should('not.exist');
    cy.get('[data-cy="correctCount"]').should('not.exist');
    cy.get('[data-cy="hola-card"]').should('have.class', 'correct');
    cy.get('[data-cy="uno-card"]').should('have.class', 'correct');
    cy.get('[data-cy="gris-card"]').should('have.class', 'correct');
  });

  it('Resets the game after it is completed', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"] [data-cy="translation"]').type(
      'hello{enter}'
    );
    cy.get('[data-cy="uno-card"] [data-cy="translation"]').type('one{enter}');
    cy.get('[data-cy="gris-card"] [data-cy="translation"]').type('grey{enter}');

    cy.contains('Great work, you have completed all the words!').should(
      'be.visible'
    );
    cy.get('[data-cy="reset-game"]').click();

    cy.get('[data-cy="scoreLineText"]').should('be.visible');
    cy.get('[data-cy="correctCount"]').should('contain', '0');
    cy.contains('Great work, you have completed all the words!').should(
      'not.exist'
    );
    ['hola', 'uno', 'gris'].forEach((word) => {
      cy.get(`[data-cy="${word}-card"]`)
        .should('not.have.class', 'correct')
        .find('[data-cy="translation"]')
        .should('be.visible')
        .and('have.value', '');
    });
  });
});
