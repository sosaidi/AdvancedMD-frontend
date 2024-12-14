describe('Sidebar Component', () => {
  beforeEach(() => {
    cy.visit('/doctor/dashboard');
  });

  it('should render the sidebar', () => {
    cy.get('app-sidebar').should('be.visible');
  });

  it('should display the profile section', () => {
    cy.get('.profile-section .profile-picture').should('exist');
    cy.get('.profile-details .name').contains('Dr. John Doe');
    cy.get('.profile-details .role').contains('Cardiologist');
  });

  it('should display all navigation links', () => {
    cy.get('nav ul li a').should('have.length', 5);
    cy.get('nav ul li a').eq(0).contains('Dashboard');
    cy.get('nav ul li a').eq(1).contains('Appointments');
    cy.get('nav ul li a').eq(2).contains('Doctors');
    cy.get('nav ul li a').eq(3).contains('Patients');
    cy.get('nav ul li a').eq(4).contains('Payments');
  });

  it('should highlight the active link', () => {
    cy.get('nav ul li a').eq(0).click();
    cy.get('nav ul li a').eq(0).should('have.class', 'active-link');
  });

  it('should collapse and expand the sidebar', () => {
    cy.get('.toggle-btn').click();
    cy.get('app-sidebar').should('have.class', 'collapsed');
    cy.get('.toggle-btn').click();
    cy.get('app-sidebar').should('not.have.class', 'collapsed');
  });
});
