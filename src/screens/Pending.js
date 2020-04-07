import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, AsyncStorage, Text, TouchableOpacity, ScrollView, FlatList, Image, TouchableNativeFeedback } from 'react-native'
import { Card, Avatar, Icon, Header } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import moment from 'moment'

export const Pending = () => {

    const { navigate } = useNavigation()
    const [pending, setPending] = useState([])

    const doThis = async () => {
        let res = await AsyncStorage.getItem('pending')
        if (res != null) {
            setPending(JSON.parse(res))
        }
    }

    useEffect(() => {
        let id = setInterval(() => {
            doThis()
        }, 1000);
        return () => clearInterval(id);
    }, [])

    const approve = async (index) => {
        console.log(pending[index])
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
        doThis()
        navigate('Cases')
    }

    const reject = (index) => {
        test.push(2)
        console.log(test)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                backgroundColor='#ee6969'
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
                            <Card containerStyle={{ flex: 1 }}>
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
                                            <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>
                                                {item.name}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>Age: </Text>
                                                <Text>{item.age}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>Conditions: </Text>
                                                <Text>{item.conditions}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>Remarks: </Text>
                                                <Text>{item.remarks}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingVertical: 5 }}>
                                            <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>Last Seen: </Text>
                                            <Text>{item.lastSeenLocation}</Text>
                                            <Text>{moment(item.datetime).format('D/MMM/YYYY h:mm a')}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingVertical: 5 }}>
                                            <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>POC: </Text>
                                            <Text>{item.pocName}</Text>
                                            <Text>{item.pocContact}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <TouchableNativeFeedback
                                                onPress={() => approve(index)}>
                                                <View style={{ height: 50, width: '45%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white' }}>Approve</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback
                                                onPress={() => reject(index)}>
                                                <View style={{ height: 50, width: '45%', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
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