describe('Product Details', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/products', { fixture: 'products.json' }).as('getProducts')
      cy.visit('/')
      cy.wait('@getProducts')
    })
  
    it('verifies product structure and elements', () => {
      cy.get('.product-card').first().within(() => {
        cy.get('img').should('have.attr', 'alt').and('not.be.empty')
        cy.get('img').should('have.attr', 'src').and('include', 'placeholder.com')
        cy.get('h3').should('not.be.empty')
        cy.get('p').first().should('not.be.empty')
        cy.get('.price').invoke('text').then(text => {
          expect(text).to.match(/\$\d+\.\d{2}/)
        })
        cy.get('.buy-button').should('contain', 'Add to Cart')
      })
    })
  
    it('displays correct price formatting', () => {
      cy.get('.product-card').each($product => {
        cy.wrap($product).find('.price').invoke('text').then(text => {
          const price = parseFloat(text.replace('$', ''))
          expect(price).to.be.a('number')
          expect(price).to.be.greaterThan(0)
        })
      })
    })
  
    it('displays specific product details correctly', () => {
      cy.get('.product-card').eq(0).within(() => {
        cy.get('h3').should('contain', 'Laptop')
        cy.get('p').first().should('contain', 'High-performance')
        cy.get('.price').should('contain', '1299.99')
      })
  
      cy.get('.product-card').eq(1).within(() => {
        cy.get('h3').should('contain', 'Smartphone')
        cy.get('.price').should('contain', '799.99')
      })
    })
  })