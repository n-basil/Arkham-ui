import { render, screen } from '@testing-library/react';
import App from './App';


// test initial render
describe('On initial render', () => {

  test('ask for username.', () => {
    render(<Login />);
    const linkElement = screen.getByText(/username/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('ask for password.', () => {
    render(<Login />);
    const linkElement = screen.getByText(/password/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('render a login button.', () => {
    render(<Login />);
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });



});


