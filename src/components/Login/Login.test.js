import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import Login from './Login';

test('Login should be successful', async () => {
  const mockResponse = { token: 'user_access_token' };
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockResponse)
    })
  });
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'sarab' }
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'test@123'}
  });
  fireEvent.click(screen.getByText(/submit/i));
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Congrats! You\'re signed in!');

});

test('Login should be successful', async () => {
  const mockResponse = { token: 'user_access_token', message: 'error' };
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.reject(mockResponse)
  });
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'sarab' }
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'test@123'}
  });
  fireEvent.click(screen.getByText(/submit/i));
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('error');

});
