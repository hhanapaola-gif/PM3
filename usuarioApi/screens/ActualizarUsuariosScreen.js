import React, { useState } from "react";
import {View,Text,TextInput,Pressable,StyleSheet,Alert,Platform,} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ActualizarUsuarioScreen() {

    const { id, nombre, edad } = useLocalSearchParams();
    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [nuevaEdad, setNuevaEdad] = useState(edad);

    const mostrarMensaje = (titulo, mensaje) => {
        if (Platform.OS === "web") {
            window.alert(`${titulo}\n\n${mensaje}`);
        } else {
            Alert.alert(titulo, mensaje);
        }
    };

    const obtenerApi = () => {
        if (Platform.OS === "web") {
            return "http://localhost:5000";
        } else {
            return "http://172.20.10.6:5000";
        }
    };

    const actualizarUsuario = async () => {

        if (nuevoNombre.trim() === "" || nuevaEdad.trim() === "") {
            mostrarMensaje("Campos vacíos", "Llena todos los campos.");
            return;
        }

        try {

            const respuesta = await fetch(
                `${obtenerApi()}/v1/usuarios/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nuevoNombre,
                        edad: nuevaEdad,
                    }),
                }
            );

            const datos = await respuesta.json();

            console.log("Status:", respuesta.status);
            console.log("Respuesta:", datos);

            if (!respuesta.ok) {
                mostrarMensaje(
                    "Error",
                    datos.mensaje || "No fue posible actualizar los datos."
                );
                return;
            }

            mostrarMensaje(
                "Éxito",
                "Usuario actualizado correctamente :)"
            );

            router.back();

        } catch (error) {

            console.log(error);

            mostrarMensaje(
                "Error",
                "No fue posible actualizar los datos, lo sentimos :("
            );

        }

    };

    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.titulo}>
                    Actualizar Usuario
                </Text>

                <Text style={styles.label}>
                    Nombre
                </Text>

                <TextInput
                    style={styles.input}
                    value={nuevoNombre}
                    onChangeText={setNuevoNombre}
                />

                <Text style={styles.label}>
                    Edad
                </Text>

                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={nuevaEdad}
                    onChangeText={setNuevaEdad}
                />

                <Pressable
                    style={styles.boton}
                    onPress={actualizarUsuario}
                >
                    <Text style={styles.textoBoton}>
                        Guardar cambios
                    </Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        justifyContent: "center",
        padding: 20,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 20,
        elevation: 4,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#1F2937",
    },

    label: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 10,
        color: "#374151",
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F9FAFB",
        fontSize: 16,
    },

    boton: {
        backgroundColor: "#b13ce7",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },

    textoBoton: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },

});