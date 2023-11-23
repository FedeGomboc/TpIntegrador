import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as Clipboard from 'expo-clipboard';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MenuReutilizable from '../components/MenuReutilizable';
import ConfiguracionService from '../services/ConfiguracionService';

export default function AcercaDe({ navigation }) {

    const [image, setImage] = useState(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanQR, setScanQR] = useState(false);

    async function loadFonts() {
        await Font.loadAsync({
            'barcodeFont': require('../fonts/barcodeFont.ttf'),
        });
        setFontsLoaded(true)
    }

    let loadBackground = async () => {
      if (JSON.parse(await ConfiguracionService.obtenerFondo())) {
        let backgroundImage = JSON.parse(
          await ConfiguracionService.obtenerFondo()
        );
        setImage(backgroundImage.uri);
      }
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(NOMBRE_APP);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
        loadBackground();
        loadFonts();
    }, []);

    return (
        <>
            <SafeAreaView style={[styles.container]} >
                <ImageBackground source={{ uri: image }} style={styles.image}>
                    {fontsLoaded ? (
                        <>
                            <TouchableOpacity style={{ backgroundColor: 'white' }} onPress={() => copyToClipboard()}>
                                <Text style={{ fontSize: 20 }}>Federico Gomboc y Luciano Neiman</Text>
                                <Text style={{ fontFamily: 'barcodeFont', fontSize: 40 }}>Federico Gomboc y Luciano Neiman</Text>
                            </TouchableOpacity>
                            {/* <Text style={{ fontSize: 20 }}>Presione el QR para copiar el texto</Text> */}
                        </>
                    ) : (
                        <></>
                    )}
                    {/* <Button onPress={() => setScanQR(true)} title='Escanear APP' style={styles.button} /> */}
                    {scanQR ? (
                        <>
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                            {scanned && <>
                                <Button onPress={() => setScanned(false)} title='Escanear de nuevo' style={styles.button} />
                                <Button onPress={() => setScanQR(false)} title='Cerrar escanner' style={styles.button} />
                            </>
                            }
                        </>
                    ) : (
                        <></>
                    )}
                </ImageBackground>
                <MenuReutilizable/>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 20,
        width: 300,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 10
    },
    image: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});