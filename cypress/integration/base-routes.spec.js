/// <reference types="cypress" />

describe('Visiting all base URLS', () => {
	it('visits home', () => {
		cy.visit('/');
		cy.url().should('include', '/workout');
	});
	it('visits workout', () => {
		cy.visit('/workout');
	});
});
