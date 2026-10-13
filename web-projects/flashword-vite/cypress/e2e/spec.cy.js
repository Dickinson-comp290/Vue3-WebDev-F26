describe('My pass Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
describe('My real first Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io');
  });
});
describe('My fail Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false);
  });
});
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io');
    cy.contains('type');
  });
});
