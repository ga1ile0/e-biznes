describe('Navigation', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
    })
    
    it('has working navigation links', () => {
        cy.get('.navigation').should('be.visible')
        cy.get('.navigation a').should('have.length', 3)
        cy.get('.navigation a').eq(0).should('contain', 'Products')
        cy.get('.navigation a').eq(1).should('contain', 'Cart')
        cy.get('.navigation a').eq(2).should('contain', 'Payment')
      })
    
    it('highlights the active navigation item', () => {
    cy.get('.navigation li.active a').should('contain', 'Products')
    cy.get('.navigation li').eq(0).should('have.class', 'active')
    cy.get('.navigation li').eq(1).should('not.have.class', 'active')
    cy.get('.navigation li').eq(2).should('not.have.class', 'active')
    
    cy.get('.navigation a').contains('Cart').click()
    cy.get('.navigation li.active a').should('contain', 'Cart')
    cy.get('.navigation li').eq(0).should('not.have.class', 'active')
    cy.get('.navigation li').eq(1).should('have.class', 'active')
    cy.get('.navigation li').eq(2).should('not.have.class', 'active')
    
    cy.get('.navigation a').contains('Payment').click()
    cy.get('.navigation li.active a').should('contain', 'Payment')
    cy.get('.navigation li').eq(0).should('not.have.class', 'active')
    cy.get('.navigation li').eq(1).should('not.have.class', 'active')
    cy.get('.navigation li').eq(2).should('have.class', 'active')
    })
    
    it('navigates from products to cart', () => {
      cy.get('.product-card').first().find('.buy-button').click()
      cy.get('.navigation a').contains('Cart').click()
      cy.url().should('include', '/cart')
      cy.get('.cart-container').should('be.visible')
    })
    
    it('navigates from cart to payment', () => {
      cy.get('.product-card').first().find('.buy-button').click()
      cy.get('.navigation a').contains('Cart').click()
      
      cy.get('.checkout-button').click()
      cy.url().should('include', '/payment')
      cy.get('.payment-container').should('be.visible')
    })
    
    it('allows navigation from cart back to products', () => {
      cy.get('.navigation a').contains('Cart').click()
      cy.get('.continue-shopping').click()
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })