import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import QRScanner from "@/src/components/QrScanner"
export default function MiQRScreen(){
    return(
        
        <QRScanner></QRScanner>
        
    );
}

const styles = StyleSheet.create({
    
    boton:{
        backgroundColor: '#030392',
        width: 250,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        
        
    },
    
    botonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
})