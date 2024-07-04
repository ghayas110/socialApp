/**
 * @format
 */



import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Login from './pages/Login';

// Note: import explicitly to use the types shipped with jest.
it('Should Login', () => {
  const {getByText, getByPlaceholderText} = render(<Login />);
  const addItemButton = getByText('Login');
  const emailInput = getByPlaceholderText('helloworld@gmail.com')
  const passInput = getByPlaceholderText('Your password')
  fireEvent.changeText(emailInput,"Flight@yopmail.com")
  fireEvent.changeText(passInput,"Qwerty1234")
  fireEvent.press(addItemButton);
expect(emailInput).not.toBeNull()


});
 