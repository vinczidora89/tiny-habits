context('Image', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('should find the title', () => {
    cy.get('h1').contains('Tiny Habits');
    cy.get('.intro__chart-wrapper').should('be.visible');
    cy.get('.intro__button').should('be.visible');
  });
})
