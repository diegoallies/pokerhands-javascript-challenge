import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create deck button', () => {
  render(<App />);
  const element = screen.getByText(/Start Game/i);
  expect(element).toBeInTheDocument();
});
