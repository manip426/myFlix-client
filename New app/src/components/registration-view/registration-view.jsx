import React from "react";
import PropTypes from 'prop-types';

export function RegistrationView() {

    const username = '';
    const password = '';
    const email = '';
    const DOB = '';

  function sendForm() {
    alert('Thank you for your Registration');
    let reg = true
    props.regData(reg);
  }

  return (
    <>
      <form>
        <h1>Resgistration Form</h1>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" />
        </label>
        <label>
          Date of Birth:
          <input type="date" />
        </label>
        <button type="submit" onClick={sendForm}>Submit</button>
      </form>
    </>
  );
}

RegistrationView.propTypes = {
  regData: PropTypes.func.isRequired
};
