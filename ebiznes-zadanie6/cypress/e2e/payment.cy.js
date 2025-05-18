describe('Payment Process', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.intercept('POST', 'http://localhost:8080/api/payments', {
        statusCode: 201,
        body: { 
          message: 'Payment processed successfully',
          id: 1,
          amount: 199.99
        }
      }).as('processPayment')
      
      cy.visit('/')
      cy.wait('@getProducts')
      cy.get('.product-card').first().find('.buy-button').click()
      
      // Navigateto payment
      cy.get('.navigation a').contains('Payment').click()
    })
    
    it('displays payment form with correct total amount', () => {
      cy.get('.payment-container').should('be.visible')
      cy.get('.total-amount').should('be.visible')
    })
    
    it('requires all payment fields to be filled', () => {
      cy.get('button[type="submit"]').click()
      cy.get('form:invalid').should('exist')
    })
    
    it('successfully processes a valid payment', () => {
      cy.get('#card_number').type('4242424242424242')
      cy.get('#card_holder_name').type('Test User')
      cy.get('#expiry_date').type('12/25')
      cy.get('#cvv').type('123')
      
      cy.get('button[type="submit"]').click()
      cy.wait('@processPayment')
      
      cy.get('.success-message').should('be.visible')
      cy.get('.success-message').should('contain', 'Payment processed successfully')
    })
    
    it('shows an error message when payment fails', () => {
      cy.intercept('POST', 'http://localhost:8080/api/payments', {
        statusCode: 400,
        body: { error: 'Payment failed' }
      }).as('failedPayment')
      
      cy.get('#card_number').type('4242424242424242')
      cy.get('#card_holder_name').type('Test User')
      cy.get('#expiry_date').type('12/25')
      cy.get('#cvv').type('123')
      
      cy.get('button[type="submit"]').click()
      cy.wait('@failedPayment')
      
      cy.get('.error-message').should('be.visible')
    })
    
    it('redirects back to products page after successful payment', () => {
      cy.get('#card_number').type('4242424242424242')
      cy.get('#card_holder_name').type('Test User')
      cy.get('#expiry_date').type('12/25')
      cy.get('#cvv').type('123')
      
      cy.get('button[type="submit"]').click()
      cy.wait('@processPayment')
      
      cy.wait(2100)
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })