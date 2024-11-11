import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";

export default function BotonNovedades() {
  const [novedad, setNovedad] = useState(""); // Estado para manejar el valor del input

  // Función que maneja el cambio de texto en el input
  const handleInputChange = (text) => {
    setNovedad(text);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (novedad.trim()) {
      alert(`Novedad añadida: ${novedad}`);
      setNovedad(""); // Limpiar el input después de enviarlo
    } else {
      alert("Por favor, escribe una novedad.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.contenedor} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formulario}>
        {/* Formulario para añadir novedad */}
        <Text style={styles.tituloFormulario}>Añadir nueva novedad a mi clase</Text>
        <TextInput
          style={styles.input}
          placeholder="Escriba su novedad aquí"
          value={novedad}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.botonEnviar} onPress={handleSubmit}>
          <Text style={styles.botonTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
 

  formulario: {
    width: "100%",  // Aumenté el tamaño del formulario para que ocupe más espacio
    backgroundColor: "#4CA3D9",  // Color turquesa para el fondo del formulario
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20, // Añadido margen inferior para crear un poco de espacio con la barra de abajo
  },

  tituloFormulario: {
    fontSize: 22,  // Aumenté el tamaño de la fuente
    fontWeight: "bold",
    color: "#333",  // Cambié el color de la fuente a gris oscuro para contraste
    marginBottom: 20,
    fontFamily: "Roboto",  // Usé una fuente moderna y más estética
  },

  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ffffff",  // Fondo blanco para el campo de texto
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,  // Aumenté el tamaño de la fuente del input
    fontFamily: "Roboto",  // Fuente moderna
    borderColor: "#cccccc",  // Agregué un borde gris claro
    borderWidth: 1,
  },

  botonEnviar: {
    backgroundColor: "#000080",  // Color azul más suave
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },

  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,  // Aumenté el tamaño de la fuente del botón
    fontFamily: "Roboto",  // Fuente moderna
  },
});



