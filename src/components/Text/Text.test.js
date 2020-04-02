import React from 'react';
import Text from './Text';
import { render, screen } from '@testing-library/react';

test('Text component should render children', () => {
  render(<Text>Hello World!</Text>);
  expect(screen.getByText(/Hello/i)).toHaveTextContent('Hello World!');
});
test('Text component should render no data', () => {
  render(<Text />);
  expect(screen.getByText(/data/i)).toHaveTextContent('No data');
});
