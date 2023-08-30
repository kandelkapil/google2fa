import React, { useState, useEffect, useMemo } from 'react';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const App = () => {
const [tokenValue, setTokenValue] = useState('');
let qrCodeDataUrl;

  const secret = useMemo(() => {
    return speakeasy.generateSecret({
      name: 'Test Name',
    });
  }, []);


  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        throw err;
      } else {
        qrCodeDataUrl = data_url
      }
    });
   

  const clickHandler = () => {

    const verified = speakeasy.totp.verify({
      secret: secret.ascii,
      encoding:"ascii",
      token: tokenValue,
    });

    console.log(verified,'verified');

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {qrCodeDataUrl && (
        <img src={qrCodeDataUrl} width='300' height='300' alt='' />
      )}

      <input
        value={tokenValue}
        onChange={(e) => setTokenValue(e.target.value)}
        type='text'
      />
      <button onClick={clickHandler}>CLICK</button>
    </div>
  );
};

export default App;
