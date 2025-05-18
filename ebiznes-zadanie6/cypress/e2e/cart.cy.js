describe('Shopping Cart', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
      
      cy.get('.product-card').first().find('.buy-button').click()
      cy.get('.cart-badge').should('exist')
      
      cy.get('.navigation a').contains('Cart').click()
    })
    
    it('displays added products in the cart', () => {
      cy.get('.cart-item').should('have.length', 1)
    })
    
    it('allows increasing product quantity', () => {
      cy.get('.item-quantity button').last().click()
      cy.get('.item-quantity span').should('contain', '2')
    })
    
    it('allows decreasing product quantity', () => {
      cy.get('.item-quantity button').last().click()
      cy.get('.item-quantity span').should('contain', '2')
      
      cy.get('.item-quantity button').first().click()
      cy.get('.item-quantity span').should('contain', '1')
    })
    
    it('calculates the correct total price', () => {
      cy.go('back')
      cy.get('.product-card').eq(1).find('.buy-button').click()
      cy.get('.navigation a').contains('Cart').click()
      
      let expectedTotal = 0
      
      cy.get('.cart-item').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('.item-price').invoke('text').then(priceText => {
            const price = parseFloat(priceText.replace('$', ''))
            cy.get('.item-quantity span').invoke('text').then(quantityText => {
              const quantity = parseInt(quantityText)
              expectedTotal += price * quantity
            })
          })
        })
      }).then(() => {
        cy.get('.cart-total span').last().invoke('text').then(totalText => {
          const actualTotal = parseFloat(totalText.replace('$', ''))
          expect(actualTotal).to.be.closeTo(expectedTotal, 0.01)
        })
      })
    })
    
    it('lets users remove items from the cart', () => {
      cy.get('.remove-button').click()
      cy.get('.empty-cart').should('be.visible')
      cy.get('.cart-item').should('not.exist')
    })
  })