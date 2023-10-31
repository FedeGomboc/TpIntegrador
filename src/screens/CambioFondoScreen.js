import { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import BotonReutilizable from '../components/BotonReutilizable';
import MenuReutilizable from '../components/MenuReutilizable';

export default function CambioFondoScreen(){
    return (
        <View style={styles.container}>
            <BotonReutilizable titulo="Sacar foto"/>
            <BotonReutilizable titulo="Galeria de fotos"/>
            <MenuReutilizable/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
})