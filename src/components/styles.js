import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    // action bar
    actionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uri: {
        height: '100%',
        width: '50%',
        resizeMode: 'contain',
        borderRadius: 3,
    },
    uploadButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%',
        width: '100%',
    },
    uploadButton: {
        width: '90%',
        height: '80%',
        borderRadius: 3,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadText: {
        fontFamily: 'AirbnbCereal-Medium',
        fontSize: 15,
        textAlign: 'center',
        color: '#3e3e3e'
    }
})