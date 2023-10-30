import { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function ConfiguracionScreen(){

    const [numero, setNumero] = useState()
    const [urlVideo, setUrlVideo] = useState()
    const [urlMusica, serUrlMusica] = useState()

    return (
        <View style={styles.container}>
            <Text>Ingrese el numero de emergencia</Text>
            <TextInput onChangeText={setNumero} value={numero} keyboardType="numeric"/>

            <Text>Ingrese la url del video</Text>
            <TextInput onChangeText={setUrlVideo} value={urlVideo}/>

            <Text>Ingrese la url de la musica de fondo</Text>
            <TextInput onChangeText={serUrlMusica} value={urlMusica}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
})