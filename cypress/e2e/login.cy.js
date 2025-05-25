describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Enter your e-mail"]').should('be.visible');
    cy.get('input[placeholder="Enter your password"]').should('be.visible');
    cy.get('button')
      .contains(/^Sign In$/)
      .should('be.visible');
  });

  it('should display validation message when e-mail is empty', () => {
    cy.get('button')
      .contains(/^Sign In$/)
      .click();

    cy.get('input[placeholder="Enter your e-mail"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display validation message when e-mail is not in e-mail format', () => {
    cy.get('input[placeholder="Enter your e-mail"]').type('usertest');

    cy.get('button')
      .contains(/^Sign In$/)
      .click();

    cy.get('input[placeholder="Enter your e-mail"]')
      .invoke('prop', 'validationMessage')
      .should(
        'equal',
        `Please include an '@' in the email address. 'usertest' is missing an '@'.`,
      );
  });

  it('should display validation message when password is empty', () => {
    cy.get('input[placeholder="Enter your e-mail"]').type('user@test.com');

    cy.get('button')
      .contains(/^Sign In$/)
      .click();

    cy.get('input[placeholder="Enter your password"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display alert when e-mail and password is wrong', () => {
    cy.get('input[placeholder="Enter your e-mail"]').type('user@test.com');
    cy.get('input[placeholder="Enter your password"]').type('user123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button')
      .contains(/^Sign In$/)
      .click();

    cy.get('@alertStub').should(
      'have.been.calledWith',
      'email or password is wrong',
    );
  });

  it('should display homepage with profile appear on navbar when e-mail and password is correct', () => {
    cy.get('input[placeholder="Enter your e-mail"]').type('test2507@test.com');
    cy.get('input[placeholder="Enter your password"]').type('test@123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button')
      .contains(/^Sign In$/)
      .click();

    cy.get('section')
      .contains(/^LumaCircle$/)
      .should('be.visible');

    cy.get('button').find('img[alt="profile"]').should('exist');

    cy.get('button').find('img[alt="profile"]').click();
    cy.get('nav').contains('Leaderboards').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
