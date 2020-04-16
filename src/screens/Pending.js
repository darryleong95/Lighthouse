import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, AsyncStorage, Text, TouchableOpacity, ScrollView, FlatList, Image, TouchableNativeFeedback, Platform } from 'react-native'
import { Card, Avatar, Icon, Header } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import moment from 'moment'
import axios from 'axios'
import RNFetchBlob from 'react-native-fetch-blob'
import ImageResizer from 'react-native-image-resizer'

export const Pending = () => {

    const { navigate } = useNavigation()
    const [pending, setPending] = useState([])

    const doThis = async () => {
        console.log('doThis()')
        let res = await AsyncStorage.getItem('pending')
        if (res != null) {
            setPending(JSON.parse(res))
            console.log(JSON.parse(res))
        }
    }

    useEffect(() => {
        doThis()
        // return () => clearInterval(id);
    }, [])

    const approve = async (index) => {
        console.log('in here right now')
        let info = pending[index]
        let active = await AsyncStorage.getItem('cases')
        if (active != null) {
            active = JSON.parse(active)
            active.push(pending[index])
            pending.splice(index, 1)
            await AsyncStorage.setItem('pending', JSON.stringify(pending))
            await AsyncStorage.setItem('cases', JSON.stringify(active))
        } else {
            active = []
            active.push(pending[index])
            pending.splice(index, 1)
            await AsyncStorage.setItem('pending', JSON.stringify(pending))
            await AsyncStorage.setItem('cases', JSON.stringify(active))
        }
        let img = info.photo
        const data = await toBase64(img)
        let timestamp = info.datetime
        let text = 'Name: ' + info.name + '\n'
            + 'Last seen location: ' + info.lastSeenLocation + '\n'
            + 'Contact: ' + info.pocName + ' at - ' + info.pocContact + '\n'
            + 'Clothing: ' + info.clothing + '\n'
            + 'Conditions: ' + info.conditions + '\n'
            + 'Remarks: ' + info.remarks

        await axios.post('https://37586964.ngrok.io/sendmessage', {
            text,
            timestamp,
            from: 'Admin',
            img: data
        }).then(response => {
            console.log('response: ', response.data)
        }).catch(error => {
            console.log('error: ', error)
        })
        doThis()
        navigate('Cases')
    }

    const toBase64 = async (uri) => {
        return ImageResizer.createResizedImage(uri, 800, 600, "JPEG", 80, 360)
            .then(async ({ uri, path }) => {
                return RNFetchBlob.fs
                    .readFile(path, "base64")
                    .then(data => {
                        return data
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }).catch(err => {
                console.log(err)
                return Alert.alert('Unable to resize the photo', 'Please try again!')
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                statusBarProps={{ translucent: true }}
                containerStyle={Platform.select({
                    android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : { height: 100 },
                })}
                backgroundColor='#ec5252'
                centerComponent={{
                    text: 'Pending Approval',
                    style: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
                }}
            />
            <ScrollView>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={pending}
                    renderItem={({ item, index }) => {
                        return (
                            <Card containerStyle={{ flex: 1, elevation: 0, borderWidth: 0, borderRadius: 5 }}>
                                <View
                                    style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                    <View style={{ width: '80%', height: 300 }}>
                                        <Image
                                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                            source={{ uri: item.photo }}
                                        />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <View style={{ flexDirection: 'column', paddingVertical: 5 }}>
                                            <Text style={{ paddingVertical: 3, fontSize: 16, fontFamily: 'AirbnbCereal-Medium' }}>
                                                {item.name}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Medium' }}>Age: </Text>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book' }}>{item.age}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Medium' }}>Conditions: </Text>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book' }}>{item.conditions}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Medium' }}>Remarks: </Text>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book' }}>{item.remarks}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>Last Seen</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book', fontSize: 14 }}>{item.lastSeenLocation}</Text>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book', fontSize: 14 }}>{moment(item.datetime).format('D/MMM/YYYY h:mm a')}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingVertical: 5 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>Point of Contact</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 14 }}>{item.pocName}</Text>
                                                <Text style={{ fontFamily: 'AirbnbCereal-Book', fontSize: 14 }}>{item.pocContact}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <TouchableNativeFeedback
                                                onPress={() => approve(index)}>
                                                <View style={{ height: 50, width: '45%', backgroundColor: '#529fec', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                    <Text style={{ color: 'white' }}>Approve</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback>
                                                <View style={{ height: 50, width: '45%', backgroundColor: '#ec5252', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                    <Text style={{ color: 'white' }}>Reject</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

let test = [
    1
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})