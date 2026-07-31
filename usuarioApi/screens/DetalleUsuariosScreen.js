import React, { useState } from "react";
import {View,Text,StyleSheet,Pressable,Alert,Platform,Modal,} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function DetalleUsuariosScreen() {

    const { id, nombre, edad } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);

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

    const eliminarUsuario = () => {
        setModalVisible(true);
    };

    const confirmarEliminacion = () => {
        setModalVisible(false);
        eliminar();
    };

    const eliminar = async () => {

        try {

            const respuesta = await fetch(
                `${obtenerApi()}/v1/usuarios/${id}`,
                {
                    method: "DELETE",
                }
            );

            const datos = await respuesta.json();

            console.log(datos);

            mostrarMensaje(
                "Éxito",
                "Usuario eliminado correctamente."
            );

            router.back();

        } catch (error) {

            console.log(error);

            mostrarMensaje(
                "Error",
                "No fue posible eliminar el usuario :("
            );

        }

    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Detalles del usuario
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    Nombre
                </Text>

                <Text style={styles.valor}>
                    {nombre}
                </Text>

                <View style={styles.linea} />

                <Text style={styles.label}>
                    Edad
                </Text>

                <Text style={styles.valor}>
                    {edad} años
                </Text>

                <Pressable
                    style={styles.botonActualizar}
                    onPress={() =>
                        router.push({
                            pathname: "/actualizarUsuario",
                            params: {
                                id,
                                nombre,
                                edad,
                            },
                        })
                    }
                >
                    <Text style={styles.textoBoton}>
                        Actualizar
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.botonEliminar}
                    onPress={eliminarUsuario}
                >
                    <Text style={styles.textoBoton}>
                        Eliminar
                    </Text>
                </Pressable>

            </View>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>

                    <View style={styles.modalCard}>

                        <Text style={styles.modalTitulo}>
                            Eliminar usuario
                        </Text>

                        <Text style={styles.modalMensaje}>
                            ¿Deseas eliminar este usuario?
                        </Text>

                        <View style={styles.modalBotones}>

                            <Pressable
                                style={styles.botonCancelar}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textoBoton}>
                                    Cancelar
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.botonConfirmarEliminar}
                                onPress={confirmarEliminacion}
                            >
                                <Text style={styles.textoBoton}>
                                    Eliminar
                                </Text>
                            </Pressable>

                        </View>

                    </View>

                </View>
            </Modal>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        padding: 20,
        justifyContent: "center",
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#1F2937",
    },

    card: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 15,
        elevation: 4,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    label: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 10,
    },

    valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2014cc",
    },

    linea: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 15,
    },

    botonActualizar: {
        backgroundColor: "#b13ce7",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 30,
    },

    botonEliminar: {
        backgroundColor: "#DC2626",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 12,
    },

    textoBoton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modalCard: {
        width: "100%",
        maxWidth: 340,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 22,
        elevation: 6,

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    modalTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1F2937",
        marginBottom: 10,
    },

    modalMensaje: {
        fontSize: 16,
        textAlign: "center",
        color: "#4B5563",
        marginBottom: 20,
    },

    modalBotones: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    botonCancelar: {
        flex: 1,
        backgroundColor: "#9CA3AF",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
    },

    botonConfirmarEliminar: {
        flex: 1,
        backgroundColor: "#DC2626",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 8,
    },

});