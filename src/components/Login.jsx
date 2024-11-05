
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';

// Necesario para el flujo de inicio de sesión en Expo Go
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '15722985096-5cpgqp2v2qjc8batd2lcg0161evmg9d7.apps.googleusercontent.com',
    redirectUri: 'http://localhost:8081',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate('AppDrawer');
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [response]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('AppDrawer');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {/* Botón de inicio de sesión estilizado */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.7}
      >
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón para iniciar sesión con Google */}
      <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
        <View style={styles.google}>
          <Image source={require('@/assets/images/logoGoogle.png')} style={styles.imagenGoogle} />
          <Text style={styles.googleTexto}>Iniciar sesión con Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  google: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  googleTexto: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },

  imagenGoogle: {
    height: 23,
    width: 22,
    marginHorizontal: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
 
  loginButton: {
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
