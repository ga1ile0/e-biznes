describe('UI Element Details', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
    })
  
    it('verifies navigation styling', () => {
      cy.get('.navigation').should('have.css', 'background-color')
      cy.get('.navigation ul').should('have.css', 'display', 'flex')
    })
    
  })