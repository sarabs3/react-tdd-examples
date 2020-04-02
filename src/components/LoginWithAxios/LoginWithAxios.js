import React, { useReducer } from 'react'
import axios from 'axios';
const initialState = {
  resolved: false,
  loading: false,
  error: null,
};
const reducer = (state, action) => ({ ...state, ...action });

const Login = () => {
  const [state, setState] = useReducer(reducer, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const {usernameInput, passwordInput} = event.target.elements;

    setState({loading: true, resolved: false, error: null});
    axios.post('/api/login', {
      username: usernameInput.value,
      password: passwordInput.value,
    }, { headers: {'Content-Type': 'application/json'} })

        .then(
            user => {
              setState({loading: false, resolved: true, error: null})
              window.localStorage.setItem('token', user.token)
            },
            error => {
              setState({loading: false, resolved: false, error: error.message})
            },
        )
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usernameInput">Username</label>
            <input id="usernameInput" />
          </div>
          <div>
            <label htmlFor="passwordInput">Password</label>
            <input id="passwordInput" type="password" />
          </div>
          <button type="submit">Submit{state.loading ? '...' : null}</button>
        </form>
        {state.error ? <div role="alert">{state.error}</div> : null}
        {state.resolved ? (
            <div role="alert">Congrats! You're signed in!</div>
        ) : null}
      </div>
  )
};

export default Login;
