import { useState } from 'react';
import { db } from '@/firebase'; 
import { collection, addDoc } from "firebase/firestore";
import React from 'react';
import { getAuth } from "firebase/auth";
import { StyleSheet, View, Modal, TouchableOpacity, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function CrearClaseFormulario({ modalVisible, setModalVisible }) {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [curso, setCurso] = useState('');



  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user){
      try {
      
        await addDoc(collection(db, "clases"), {
          codigo: codigo,
          descripcion: descripcion,
          curso: curso,
          profesorId: user.uid,
        });
        console.log('Clase creada exitosamente');
        setModalVisible(false);
      } catch (error) {
        console.error('Error al crear la clase: ', error);
      }
    }
    
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.cerrar} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="#2C4B9A" />
          </TouchableOpacity>
          <Text style={styles.Title}>Crear clase</Text>
          <Text style={styles.default}>Ingrese datos para crear su clase:</Text>
          <TextInput
            placeholder="Codigo"
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
          />
          <TextInput
            placeholder="Descripcion de la materia"
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            placeholder="Curso"
            style={styles.input}
            value={curso}
            onChangeText={setCurso}
          />
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botonText}>Crear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cerrar: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  boton: {
    backgroundColor: '#030392',
    width: 250,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    marginTop: 10,
  },
  botonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente
  },
  default: {
    fontSize: 15,
    marginBottom: 5,
  },
  formContainer: {
    width: 400,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  Title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});