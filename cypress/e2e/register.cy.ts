import { faker } from '@faker-js/faker';

describe('Register spec', () => {
	const baseurl = 'http://localhost:5173';

	beforeEach(() => {
		cy.visit(`${baseurl}/register`);
	});

	it('Should display register page correctly', () => {
		cy.get('input[data-path="name"]').should('be.visible');
		cy.get('input[data-path="email"]').should('be.visible');
		cy.get('input[data-path="password"]').should('be.visible');
		cy.get('button[type="submit"').should('be.visible');
	});

	it('Should toggles the password field visibility', () => {
		cy.get('input[data-path="password"]').type(faker.internet.password());
		cy.get('.mantine-PasswordInput-visibilityToggle')
			.click()
			.then(() => {
				cy.get('input[data-path="password"]').should('have.attr', 'type', 'text');
			});
		cy.get('.mantine-PasswordInput-visibilityToggle')
			.click()
			.then(() => {
				cy.get('input[data-path="password"]').should('have.attr', 'type', 'password');
			});
	});

	it('Displays error field when doesnt match with our form schema', () => {
		cy.get('input[data-path="email"]').type(faker.internet.password());
		cy.get('button[type="submit"')
			.click()
			.then(() => {
				cy.get('input[data-path="email"]').should('have.attr', 'aria-invalid', 'true');
			});
	});

	it('Displays error when doesnt match with api requirements', () => {
		cy.get('input[data-path="name"]').type(faker.internet.displayName());
		cy.get('input[data-path="email"]').type('asd@asd.asd');
		cy.get('input[data-path="password"]').type(faker.internet.password());
		cy.get('button[type="submit"')
			.click()
			.then(() => {
				cy.get('.mantine-Alert-label').should('be.visible').should('have.text', 'FAIL');
			});
	});

	it('Redirects after register success', () => {
		cy.get('input[data-path="name"]').type(faker.internet.displayName());
		cy.get('input[data-path="email"]').type(faker.internet.email());
		cy.get('input[data-path="password"]').type(faker.internet.password());
		cy.get('button[type="submit"')
			.click()
			.then(() => {
				cy.url().should('eq', `${baseurl}/`);
			});
	});
});
