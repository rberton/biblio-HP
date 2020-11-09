import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getByText(/La bibliothèque d'Henri Potier/i);
  expect(titleElement).toBeInTheDocument();
});
