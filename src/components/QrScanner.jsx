import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase'; 
import QrScanner from 'react-qr-scanner';

export default function QRScanner() {
  const [qrDataList, setQrDataList] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      const scannedText = data.text; // Texto del QR
      if (!qrDataList.includes(scannedText)) {
        setQrDataList((prev) => [...prev, scannedText]);
        Alert.alert('Código QR escaneado', `Añadido: ${scannedText}`);
      } else {
        Alert.alert('Código duplicado', 'Este QR ya fue escaneado.');
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
    Alert.alert('Error', 'Hubo un problema con el escáner.');
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para guardar los datos.');
      return;
    }

    if (qrDataList.length === 0) {
      Alert.alert('Error', 'No hay datos para guardar.');
      return;
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Fecha en formato "YYYY-MM-DD"
      await addDoc(collection(db, 'asistencias'), {
        emails: qrDataList,
        date: currentDate,
        profesorId: user.uid,
      });
      Alert.alert('Éxito', 'Datos guardados exitosamente.');
      setQrDataList([]); // Limpiar datos tras guardar
      setIsScanning(false); // Apagar el escáner tras guardar
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsScanning((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {isScanning ? 'Detener Escáner' : 'Iniciar Escáner'}
        </Text>
      </TouchableOpacity>

      {isScanning && (
        <View style={styles.scannerContainer}>
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: 350, height: 350 }}
          />
        </View>
      )}

      <FlatList
        data={qrDataList}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        style={styles.listContainer}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Asistencias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scannerContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    
  },
  listItem: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
  },
});