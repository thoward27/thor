/// <reference types="cypress" />

describe('Create, edit, and discard single set.', () => {
	it('can start a workout', () => {
		cy.visit('/workout');
		// This waits for it to be enabled, then clicks it.
		cy.contains('Start Workout').click();
		// Which should create a set and add a workout.
		cy.get('[data-cy=set]').should('have.length', 1);
	});
	it('can edit the set', () => {
		cy.contains('edit').click();
		cy.get('[data-cy=edit]').within(() => {
			cy.contains('Exercise').type('cypress-exercise');
			cy.contains('Add Modifier').click();
			// Variant should still exist, until we change the modifier to band.
			cy.contains('variant').get('input').should('be.empty');
			cy.contains('Modifier Name').type('band');
			// Now that we've selected band, variant should contain "color"
			cy.contains('color', { matchCase: false }).type('red');
			// Deleting the modifier should remove all input fields.
			cy.contains('delete').click();
			cy.contains('Modifier Name').should('have.length', 0);
		});
		cy.contains('Close').click();
		cy.get('[data-cy=set]').should('contain.text', 'cypress-exercise');
	});
	it('can be finished', () => {
		cy.contains('Finish').click();
		cy.get('[data-cy=set]').should('have.length', 0);
	});
});
