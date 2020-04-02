import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import axios from 'axios';
import Login from "./LoginWithAxios";

jest.mock('axios');

test('Login should be successful', async () => {
  const mockResponse = { token: 'user_access_token' };
  axios.post.mockImplementationOnce(() => {
    return Promise.resolve(mockResponse)
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
  expect(window.localStorage.getItem('token')).toBe(mockResponse.token);

});

test('Login should be successful', async () => {
  const mockResponse = { token: 'user_access_token', message: 'error' };
  axios.post.mockImplementationOnce(() => {
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
