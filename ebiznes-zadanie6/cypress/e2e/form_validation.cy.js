describe('Form Validations', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
      cy.get('.product-card').first().find('.buy-button').click()
      cy.get('.navigation a').contains('Payment').click()
    })
    
    it('validates required fields in payment form', () => {
      cy.get('.pay-button').click()
      cy.get('#card_number:invalid').should('exist')
      cy.get('#card_holder_name:invalid').should('exist')
      cy.get('#expiry_date:invalid').should('exist')
      cy.get('#cvv:invalid').should('exist')
      
      cy.get('#card_number').type('4242424242424242')
      cy.get('.pay-button').click()
      cy.get('#card_number:valid').should('exist')
      cy.get('#card_holder_name:invalid').should('exist')
      cy.get('#expiry_date:invalid').should('exist')
      cy.get('#cvv:invalid').should('exist')
      
      cy.get('#card_holder_name').type('Test User')
      cy.get('.pay-button').click()
      cy.get('#card_holder_name:valid').should('exist')
      cy.get('#expiry_date:invalid').should('exist')
      cy.get('#cvv:invalid').should('exist')
    })
    
    it('enforces input field constraints', () => {
      cy.get('#card_number').type('12345678901234567890')
      cy.get('#card_number').should('have.value', '1234567890123456')
      
      cy.get('#cvv').type('12345')
      cy.get('#cvv').should('have.value', '123')
      
      cy.get('#expiry_date').type('12/2025')
      cy.get('#expiry_date').should('have.value', '12/20')
    })
  })