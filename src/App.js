import React, { useState } from 'react';
import { useReadOTP } from "react-read-otp";

const App = () => {
  const [otp, setOTP] = useState('');
  useReadOTP(setOTP);
  const [data, setData] = useState({
    countryCode: 98,
    mobileWithOutCountryCode: '9390753192',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://api.naghshealmas.com/api/fa/Account/SignUp/SendVerificationCodeForResetPassword', {
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
      <input placeholder="Enter otp" value={otp} onChange={e => setOTP(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;