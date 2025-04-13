import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders New Day link', () => {
  render(<App />);
  const linkElement = screen.getByText(/New Day/i);
  expect(linkElement).toBeInTheDocument();
});
