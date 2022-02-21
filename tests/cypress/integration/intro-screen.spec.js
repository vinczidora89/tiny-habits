context('Image', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('should find the title, chart and button', () => {
    cy.get('h1').contains('Tiny Habits');
    cy.get('.intro__behaviour-chart').should('be.visible');
    cy.get('.intro__button').should('be.visible');
    cy.get('.intro__button').click();
  });
  it('should click on the button and go to the next screen', () => {
    cy.get('.intro__button').click();
    cy.get('h2').contains('Set a goal');
  });
})
