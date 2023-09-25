beforeEach(() => {
  cy.intercept('GET', "http://localhost:3001/api/v1/urls", {
    statusCode: 200,
    fixture: 'getResponse' 
  }).as('getResponse')
})
describe('When a user visits the page, they can view the page title, form and the existing shortened URLs', () => {
  it('should allow the user to view the page title, form, and existing short URLS', () => {
    cy.visit("http://localhost:3000").wait('@getResponse')
    cy.get('h1').should('contain', 'URL Shortener')
    cy.get('input[name="title"]').should('exist')
    cy.get('input[name="longUrl"]').should('exist')
    cy.get('button').should('contain', 'Shorten Please!')
    cy.get('div.url').first().should('contain', 'Awesome photo')
    cy.get('div.url').last().should('contain', 'i LOVE URLS')
  })
})

describe('When a user fills out the form, the information is reflected in the input field values', () => {
  it('should allow the user to type into a controlled form', () => {
    cy.visit("http://localhost:3000").wait('@getResponse')
    cy.get('input[name="title"]').type('testOne')
    cy.get('input[name="longUrl"]').type('example.com')
  })
})

describe('When a user fills out and submits the form, the new shortened URL is rendered', () => {
  it('should allow the user to submit and see new URLS when submitted', () => {
    cy.intercept('POST', "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'postResponse' 
    }).as('postResponse')
    cy.visit("http://localhost:3000").wait('@getResponse')
    cy.get('input[name="title"]').type('testOne')
    cy.get('input[name="longUrl"]').type('example.com')
    cy.get('button').click()
    cy.wait('@postResponse')
    cy.get('div.url').first().should('contain', 'Awesome photo')
    // cy.get('div.url').last().should('contain', 'testOne')
  })
})