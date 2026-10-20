describe('FlashWord Tests', () => {
  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    cy.get('#correctCount').should('contain', '0');
    cy.get('#totalCount').should('contain', '3');
    // Get the header and check its contents.
    // cy.get('h1').should('contain', 'FlashWord');
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    cy.get('#completed').should('not.exist');
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

    // Check that each of the word card's is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // check that hola-card does not have a style attribute
    cy.get('[data-cy="hola-card"]').should('not.have.class', 'correct');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'hola');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    //////

    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'uno');

    cy.get('[data-cy="uno-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');

    /////////

    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="word"]')
      .should('be.visible')
      .should('contain', 'gris');

    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .should('be.visible')
      .should('have.value', '');
  });

  it('Types word into word card and checks if the word was typed', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="gris-card"]')
      .find('[data-cy="translation"]')
      .type('grey')
      .should('have.value', 'grey');
  });

  it('Updates the word card when the correct answer is entered', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="hola-card"]')
      .find('[data-cy="translation"]')
      .type('hello{enter}');

    cy.get('[data-cy="hola-card"]')
      .should('have.class', 'correct')
      .find('[data-cy="translation"]')
      .should('not.exist');
    cy.get('[data-cy="hola-card"]')
      .find('.correctAnswer')
      .should('be.visible')
      .and('contain', 'hello');
    cy.get('#correctCount').should('contain', '1');
  });

  it('Shows the completed game state after all words are answered correctly', () => {
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
    cy.get('#correctCount').should('not.exist');
    cy.get('#totalCount').should('not.exist');

    ['hola', 'uno', 'gris'].forEach((word) => {
      cy.get(`[data-cy="${word}-card"]`)
        .should('have.class', 'correct')
        .find('[data-cy="translation"]')
        .should('not.exist');
    });
    cy.get('[data-cy="hola-card"]')
      .find('.correctAnswer')
      .should('contain', 'hello');
    cy.get('[data-cy="uno-card"]')
      .find('.correctAnswer')
      .should('contain', 'one');
    cy.get('[data-cy="gris-card"]')
      .find('.correctAnswer')
      .should('contain', 'grey');
  });

  it('Resets the game after it is completed', () => {
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
    cy.get('#completed').should('be.visible');

    cy.get('[data-cy="reset-game"]').should('be.visible').click();

    cy.get('#correctCount').should('contain', '0');
    cy.get('#totalCount').should('contain', '3');
    cy.get('#completed').should('not.exist');
    ['hola', 'uno', 'gris'].forEach((word) => {
      cy.get(`[data-cy="${word}-card"]`)
        .should('not.have.class', 'correct')
        .find('[data-cy="translation"]')
        .should('be.visible')
        .and('have.value', '');
    });
  });
});
