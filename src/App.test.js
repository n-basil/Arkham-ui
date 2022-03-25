import { render, screen } from '@testing-library/react';
import App from './App';


// Login
describe('The login page', () => {
  beforeAll(() => {
    render(<Login />)
  });

  test('should render an authenticate button', () => {
    const linkElement = screen.getByText(/authenticate/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render the arkham logo', () => {

    const linkElement = screen.getByTestId('logo')
    expect(linkElement).toBeInTheDocument();
  });

  xtest('ask for password.', () => {
  
    const linkElement = screen.getByText(/password/i);
    expect(linkElement).toBeInTheDocument();
  });

  xtest('render a login button.', () => {
  
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

});


// WORKSPACE
describe('The workspace page', () => {
  beforeAll(() => {
    render(<Workspace />)
  });

  test('should render the NavBar', () => {

    const linkElement = screen.getByTestId('NavBar')
    expect(linkElement).toBeInTheDocument();
  });

  test('should render the graph.', () => {
  
    const linkElement = screen.getByTestId('Graph')
    expect(linkElement).toBeInTheDocument();
  });

  test('should render the a hamburger button.', () => {

    const linkElement = screen.getByTestId('Hamburger')
    expect(linkElement).toBeInTheDocument();
  });

  test('should render a search input.', () => {

    const linkElement = screen.getByTestId('SearchInput')
    expect(linkElement).toBeInTheDocument();
  });

  test('should render an account button.', () => {
    const linkElement = screen.getByTestId('Acct')
    expect(linkElement).toBeInTheDocument();
  });


});