import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../components/Auth';

/*
 * Página
 */
const Logout = (props) => {
  logout();
  return (
    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )
};

export default Logout;