import React, { useState } from 'react';
import { Text, View } from 'react-native';
import QrScanner from 'react-qr-scanner';

export default function QRScanner() {
  const [qrData, setQrData] = useState('');

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      alert(`Código QR escaneado: ${data.text}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%', height: '80%' }}
      />
      <Text>{qrData ? `Datos escaneados: ${qrData}` : 'Escanee un código QR'}</Text>
    </View>
  );
}