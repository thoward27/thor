/// <reference types="cypress" />

const USERNAME = 'cypress';
const PASSWORD = 'testing123';

describe('Create account, sign out, sign back in.', () => {
	it('can not sign in without registering', () => {
		cy.viewport('macbook-11');
		cy.visit('/');
		cy.contains('Sign in').click();
		cy.get('#alias').type(USERNAME);
		cy.get('#password').type(PASSWORD);
		cy.contains('Log in').click();
		cy.get('.message').should('have.length', 1).should('contain.text', 'Failed');
	});
	it('can register', () => {
		cy.viewport('macbook-11');
		cy.contains('Sign up').click();
		cy.get('#alias').type(USERNAME);
		cy.get('#password').type(PASSWORD);
		cy.get('#repeat').type(PASSWORD);
		cy.get('#terms').check();
		cy.contains('Register').click();
        cy.contains('Sign in').should('not.exist')
	});
    it('can sign out', () => {
        cy.contains('Sign out').click({force: true})
    });
    it('can sign back in', () => {
        cy.viewport('macbook-11');
        cy.contains('Sign in').click();
        cy.get('#alias').type(USERNAME);
        cy.get('#password').type(PASSWORD);
        cy.contains('Log in').click();
    })
});
