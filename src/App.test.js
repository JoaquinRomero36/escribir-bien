import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza el landing y el CTA principal', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /escribe sin dudar/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /empezar mi racha/i })).toBeInTheDocument();
});