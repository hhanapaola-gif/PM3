import { SafeAreaView, View, Text, FlatList, StyleSheet, Platform, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);

  const obtenerApi = () => {
    if (Platform.OS === 'web') {
      return 'http://localhost:5000';
    } else {
      return 'http://172.20.10.6:5000';
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(`${obtenerApi()}/v1/usuarios/`);
      const datos = await respuesta.json();
      console.log('Respuesta API', datos);

      setUsuarios(datos.usuarios);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

const renderTarjeta = ({ item }) => (
  <View style={styles.card}>

    <Text style={styles.nombre}>{item.nombre}</Text>

    <View style={styles.linea}></View>

    <Text style={styles.info}>
      Edad: {item.edad} años
    </Text>

    <Pressable
      style={styles.botonDetalles}
      onPress={() => router.push({pathname: "/detalleUsuario",params: {id: item.id, nombre: item.nombre, edad: item.edad, },})}>

      <Text style={styles.textoDetalles}>
        Ver detalles...
      </Text>
    </Pressable>

  </View>
);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#2014cc",
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  botonDetalles: {
  alignSelf: "flex-end",
  marginTop: 15,
  },

  textoDetalles: {
    color: "#2014cc",
    fontWeight: "bold",
    fontSize: 16,
  },

});