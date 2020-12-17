const URL = 'http://127.0.0.1:5500/demo/index.html';

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit(URL);
    const body = cy.get('body');

    body.trigger('mousedown');
    body.trigger('mousemove', { clientY: 0 });

    body.trigger('mousedown', { clientY: 100 });
    body.trigger('mousemove', { clientY: 200 });

    body.trigger('mousedown');
    body.trigger('mousemove', { clientX: 200 });

    body.trigger('mousedown', { clientX: 100 });
    body.trigger('mousemove', { clientX: 200 });

    cy.get('#swipe-down').should('have.text', '1');
    cy.get('#swipe-left').should('have.text', '1');
    cy.get('#swipe-up').should('have.text', '1');
    cy.get('#swipe-right').should('have.text', '1');
  });
});
