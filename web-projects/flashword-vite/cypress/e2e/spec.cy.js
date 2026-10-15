describe('FlashWord Tests', () => {
  const completeAllWords = () => {
    cy.get('[data-cy="hola-card"] [data-cy="translation"]').type(
      'hello{enter}'
    );
    cy.get('[data-cy="uno-card"] [data-cy="translation"]').type('one{enter}');
    cy.get('[data-cy="gris-card"] [data-cy="translation"]').type('grey{enter}');
  };

  it('Check initial page state', () => {
    // Open the FlashWord app running on the dev server.
    cy.visit('http://localhost:5173/');

    // Get the header and check its contents.
    cy.get('[data-cy="app-header"]').should('contain', 'FlashWord');

    // Check the initial answer count.
    cy.get('[data-cy="answer-count"]')
      .should('be.visible')
      .and('contain', 'You have answered 0 out of 3');
  });

  it('Check word cards', () => {
    cy.visit('http://localhost:5173/');

    // Check that each of the word cards is displayed.
    cy.get('[data-cy="hola-card"]').should('be.visible');
    // Check that hola-card does not have the correct class.
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

  it('shows an error message when the words request has a network error', () => {
    cy.intercept('GET', '/api/words', {
      forceNetworkError: true,
    }).as('getWordsNetworkError');

    cy.visit('http://localhost:5173/');

    cy.wait('@getWordsNetworkError')
      .its('error.message')
      .should('include', 'forceNetworkError called');
    cy.get('[data-cy="words-error"]')
      .should('be.visible')
      .and('contain', 'Something went wrong. Please try again later.');
    cy.get('[data-cy="answer-count"]').should('not.exist');
    cy.get('#cards').should('not.exist');
  });

  it('shows an error message when the words request returns an HTTP error', () => {
    cy.intercept('GET', '/api/words', {
      statusCode: 500,
      body: { message: 'Internal server error' },
    }).as('getWords');

    cy.visit('http://localhost:5173/');

    cy.wait('@getWords').its('response.statusCode').should('eq', 500);
    cy.get('[data-cy="words-error"]')
      .should('be.visible')
      .and('contain', 'Something went wrong. Please try again later.');
    cy.get('[data-cy="answer-count"]').should('not.exist');
    cy.get('#cards').should('not.exist');
  });

  it('shows an error message when the words response contains invalid JSON', () => {
    cy.intercept('GET', '/api/words', {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: '{ invalid json',
    }).as('getWordsInvalidJson');

    cy.visit('http://localhost:5173/');

    cy.wait('@getWordsInvalidJson')
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('[data-cy="words-error"]')
      .should('be.visible')
      .and('contain', 'Something went wrong. Please try again later.');
    cy.get('[data-cy="answer-count"]').should('not.exist');
    cy.get('#cards').should('not.exist');
  });

  it('loads and sorts valid leaderboard records by numeric time', () => {
    cy.intercept('GET', '/api/times', {
      body: [
        { name: 'Carlos', time: '86' },
        { name: 'Nam', time: 28 },
        { name: 'Susan', time: 35 },
        { name: 'Invalid time', time: 'fast' },
        { name: '', time: 12 },
      ],
    }).as('getLeaderboard');

    cy.visit('http://localhost:5173/');
    cy.wait('@getLeaderboard');

    cy.get('[data-cy="leaderboard-title"]')
      .should('be.visible')
      .and('contain', 'FlashWord Hall of Fame');
    cy.get('[data-cy="leaderboard"] tbody tr').should('have.length', 3);
    cy.get('[data-cy="leaderboard"] tbody tr').eq(0).should('contain', 'Nam');
    cy.get('[data-cy="leaderboard"] tbody tr').eq(1).should('contain', 'Susan');
    cy.get('[data-cy="leaderboard"] tbody tr')
      .eq(2)
      .should('contain', 'Carlos');
    cy.get('[data-cy="leaderboard"] tbody tr').eq(2).should('contain', '86s');
  });

  it('shows an empty state when there are no leaderboard scores', () => {
    cy.intercept('GET', '/api/times', { body: [] }).as('getLeaderboard');

    cy.visit('http://localhost:5173/');
    cy.wait('@getLeaderboard');
    cy.get('[data-cy="leaderboard-empty"]')
      .should('be.visible')
      .and('contain', 'Be the first to make the list!');
  });

  it('captures completion time, validates a name, submits and refreshes scores', () => {
    cy.clock();
    let scores = [{ name: 'Nam', time: 28 }];
    cy.intercept('GET', '/api/times', (request) => {
      request.reply({ body: scores });
    }).as('getLeaderboard');
    cy.intercept('POST', '/api/times', (request) => {
      scores = [...scores, request.body];
      request.reply({ statusCode: 201, body: request.body });
    }).as('postScore');

    cy.visit('http://localhost:5173/');
    cy.wait('@getLeaderboard');
    cy.get('[data-cy="answer-count"]').should('be.visible');
    cy.tick(42000);
    completeAllWords();

    cy.get('[data-cy="completion-message"]').should('be.visible');
    cy.get('[data-cy="elapsed-time"]').should('contain', '42s');
    cy.get('[data-cy="submit-score"]').click();
    cy.get('#name-error')
      .should('be.visible')
      .and('contain', 'Please enter your name.');
    cy.get('@postScore.all').should('have.length', 0);

    cy.get('[data-cy="player-name"]').type('  Ada Lovelace  ');
    cy.get('[data-cy="submit-score"]').click();
    cy.wait('@postScore').its('request.body').should('deep.equal', {
      name: 'Ada Lovelace',
      time: 42,
    });
    cy.get('[data-cy="submission-success"]').should('be.visible');
    cy.get('[data-cy="leaderboard"] tbody tr')
      .first()
      .should('contain', 'Nam')
      .and('contain', '28s');
    cy.get('[data-cy="leaderboard"] tbody tr')
      .eq(1)
      .should('contain', 'Ada Lovelace')
      .and('contain', '42s');
    cy.get('@getLeaderboard.all').should('have.length', 2);
  });

  it('shows an explicit error when the leaderboard request fails', () => {
    cy.intercept('GET', '/api/times', {
      statusCode: 503,
      body: { message: 'Service unavailable' },
    }).as('getLeaderboard');

    cy.visit('http://localhost:5173/');
    cy.wait('@getLeaderboard');
    cy.get('[data-cy="leaderboard-error"]')
      .should('be.visible')
      .and('contain', 'The leaderboard could not be loaded.');
    cy.get('[data-cy="leaderboard"]').should('not.exist');
  });

  it('shows an accessible error when score submission fails', () => {
    cy.intercept('GET', '/api/times', { body: [] }).as('getLeaderboard');
    cy.intercept('POST', '/api/times', {
      statusCode: 500,
      body: { message: 'Internal server error' },
    }).as('postScore');

    cy.visit('http://localhost:5173/');
    cy.wait('@getLeaderboard');
    completeAllWords();
    cy.get('[data-cy="player-name"]').type('Grace Hopper');
    cy.get('[data-cy="submit-score"]').click();

    cy.wait('@postScore').its('response.statusCode').should('eq', 500);
    cy.get('[data-cy="submission-error"]')
      .should('be.visible')
      .and('have.attr', 'role', 'alert')
      .and('contain', 'Your score could not be submitted.');
    cy.get('[data-cy="submit-score"]').should('be.enabled');
  });
});
