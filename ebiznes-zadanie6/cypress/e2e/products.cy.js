describe('Products Page', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
    })
  
    it('displays product listings', () => {
      cy.get('.product-card').should('have.length.at.least', 1)
    })
  
    it('shows product details correctly', () => {
      cy.get('.product-card').first().within(() => {
        cy.get('h3').should('be.visible')
        cy.get('.price').should('be.visible')
        cy.get('img').should('be.visible')
        cy.get('p').should('be.visible')
      })
    })
  
    it('has working "Add to Cart" buttons', () => {
      cy.get('.product-card').first().within(() => {
        cy.get('.buy-button').should('be.visible').click()
      })
      cy.get('.cart-badge').should('exist').should('contain', '1')
    })

    it('verifies product card styling', () => {
        cy.get('.product-card').first().should('have.css', 'border')
        cy.get('.product-card').first().should('have.css', 'border-radius')
        cy.get('.buy-button').should('have.css', 'background-color', 'rgb(42, 157, 143)')
        cy.get('.buy-button').should('have.css', 'color', 'rgb(255, 255, 255)')
      })
  
    it('adds multiple of the same product when clicking Add to Cart multiple times', () => {
      const clickCount = 3
      cy.get('.product-card').first().within(() => {
        for (let i = 0; i < clickCount; i++) {
          cy.get('.buy-button').click()
        }
      })
      cy.get('.cart-badge').should('exist').should('contain', clickCount)
    })
  
    it('displays error message when product loading fails', () => {
      cy.intercept('GET', 'http://localhost:8080/api/products', {
        statusCode: 500,
        body: { message: 'Server error' }
      }).as('getProductsError')
      cy.visit('/')
      cy.wait('@getProductsError')
      cy.get('.error').should('be.visible')
    })
  })