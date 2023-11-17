import React, { useEffect } from 'react';
import { View, Text, Vibration, StyleSheet, Modal, Pressable } from 'react-native'

export default function MensajeModal( mensaje, verModal, setVerModal, acceso ) {

    useEffect(() => {
        if (verModal) {
            Vibration.vibrate();
        }
    }, [verModal])

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={verModal}
                onRequestClose={() => {
                    setVerModal(!verModal);
                }}>
                <View style={styles.modalContainer}>
                    {acceso ? (
                        <View style={styles.innerContainer}>
                            <Text>{mensaje}</Text>
                            <Pressable
                                onPress={() => setVerModal(!verModal)}>
                                <Text>Cerrar modal</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.innerContainer}>
                            <Text>{mensaje}</Text>
                            <Pressable
                                onPress={() => setVerModal(!verModal)}>
                                <Text>Cerrar modal</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(255, 0, 0, 0.5)' // Fondo rojo con opacidad
    },
    innerContainer: {
        backgroundColor: 'white', // Fondo blanco para el contenido
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
});
