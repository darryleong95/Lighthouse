import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

export default CameraComponent = (props) => {
    let replacementImage = require('../assets/upload.png')
    let hasUpload = props.hasUpload
    let uri = props.uri
    return (
        <View style={styles.actionContainer}>
            <View style={styles.imageContainer}>
                <Image style={[styles.uri, hasUpload && { height: '80%', marginTop: 20 }]} source={hasUpload ? { uri } : replacementImage} />
                {
                    hasUpload &&
                    <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.remove()} style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                            <Text style={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15, color: 'red' }}>
                                Remove Photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={[styles.uploadButtonWrapper]}>
                <TouchableOpacity style={styles.uploadButton} onPress={() => props.show()}>
                    <Text style={styles.uploadText}>{hasUpload ? "Replace Image" : "Attach Photo"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
