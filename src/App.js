import React, { useState } from 'react';

function App() {
  const [otp, setOTP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      countryCode: 98,
      mobileWithOutCountryCode: '9390753192',
    }

    fetch('https://api.naghshealmas.com/api/fa/Account/SignUp/SendVerificationCodeForResetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        const sms = responseData.sms;
        const regex = /کد تأیید شما: (\d+)/;
        const match = sms.match(regex);
        const verificationCode = match ? match[1] : '';

        setOTP(verificationCode);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Welcome home</h3>
      <button onClick={handleSubmit}>Send OTP</button>
      <input placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
    </div>
  );
}

export default App;