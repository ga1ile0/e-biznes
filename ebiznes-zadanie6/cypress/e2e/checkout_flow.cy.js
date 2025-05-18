describe('Checkout Flow', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.intercept('POST', 'http://localhost:8080/api/payments', {
        statusCode: 201,
        body: { message: 'Payment processed successfully', id: 1, amount: 199.99 }
      }).as('processPayment')
      cy.visit('/')
      cy.wait('@getProducts')
    })
  
    it('completes the full checkout process', () => {
      cy.get('.product-card').first().find('.buy-button').click()
      cy.get('.cart-badge').should('exist').and('contain', '1')
  
      cy.get('.navigation a').contains('Cart').click()
      cy.url().should('include', '/cart')
      
      cy.get('.cart-item').should('have.length', 1)
      cy.get('.item-total').should('be.visible')
      cy.get('.cart-total').should('be.visible')
  
      cy.get('.checkout-button').click()
      cy.url().should('include', '/payment')
      
      cy.get('#card_number').type('4242424242424242')
      cy.get('#card_number').should('have.value', '4242424242424242')
      
      cy.get('#card_holder_name').type('Test User')
      cy.get('#card_holder_name').should('have.value', 'Test User')
      
      cy.get('#expiry_date').type('12/25')
      cy.get('#expiry_date').should('have.value', '12/25')
      
      cy.get('#cvv').type('123')
      cy.get('#cvv').should('have.value', '123')
      
      cy.get('.pay-button').click()
      cy.wait('@processPayment')
      
      cy.get('.success-message').should('contain', 'Payment processed successfully')
      cy.wait(2100) 
      cy.url().should('eq', 'http://localhost:3000/')
      
      cy.get('.cart-badge').should('not.exist')
    })
  })