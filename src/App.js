import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState({
    countryCode: 98,
    mobileWithOutCountryCode: '9390753192',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://172.17.17.101:8088/api/en/Account/SignUp/SendVerificationCodeForResetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
      })
      .catch((error) => {
        // Handle any error that occurred
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country Code:
        <input
          type="number"
          name="countryCode"
          value={data.countryCode}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileWithOutCountryCode"
          value={data.mobileWithOutCountryCode}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;