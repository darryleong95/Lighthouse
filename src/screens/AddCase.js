import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Header, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment'
import { NavigationActions, StackActions } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';


let resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Cases' })
    ],
});

export const AddCase = (props) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [conditions, setConditions] = useState('')
    const [remarks, setRemarks] = useState('')
    const [clothing, setClothing] = useState('')
    const [datetime, setDatetime] = useState('')
    const [pocName, setPocName] = useState('')
    const [pocContact, setPocContact] = useState('')
    const [lastSeenLocation, setLastSeenLocation] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [uri, setUri] = useState('')
    const { goBack, navigate, dispatch } = useNavigation()

    const handleConfirm = (date) => {
        console.log('date: ', date)
        setDatetime(date)
        hideDatePicker()
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const showImagePicker = () => {
        const options = {
            title: 'Select Photo to Upload',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            rotation: 360,
            takePhotoButtonTitle: 'Take Photo',
            chooseFromLibraryButtonTitle: 'Choose from Gallery'
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { error, uri } = response
                if (uri && !error) {
                    setUri(uri)
                } else if (error) {
                    console.log("The photo picker errored. Check ImagePicker.launchCamera func")
                    console.log(error)
                }

            }
        });
    }

    const submit = async () => {
        // write to json
        let content = {
            name,
            age,
            conditions,
            remarks,
            clothing,
            datetime: moment(datetime).valueOf(),
            pocName,
            pocContact,
            lastSeenLocation,
            photo: uri,
            status: 'pending'
        }
        let pending = await AsyncStorage.getItem("pending")
        let data = pending == null ? data = [] : JSON.parse(pending)
        data.push(content)
        console.log('Data: ', data)
        await AsyncStorage.setItem("pending", JSON.stringify(data))
        dispatch(resetAction)
        navigate('Pending')
    }

    return (
        <KeyboardAwareScrollView>
            <View style={{ flex: 1 }}>
                <Header
                    statusBarProps={{ translucent: true }}
                    containerStyle={Platform.select({
                        android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : { height: 100 },
                    })}
                    backgroundColor='#ec5252'
                    leftComponent={<Icon color="#fff" name="chevron-left" onPress={() => goBack()} />}
                    centerComponent={{
                        text: 'Report New Case',
                        style: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
                    }}
                />
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <View style={{ width: '90%' }}>
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={name} placeholder="Name" onChangeText={(e) => setName(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={age} placeholder="Age" onChangeText={(e) => setAge(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={conditions} placeholder="Conditions" onChangeText={(e) => setConditions(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={remarks} placeholder="Remarks" onChangeText={(e) => setRemarks(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={clothing} placeholder="Clothing" onChangeText={(e) => setClothing(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={pocName} placeholder="Point of Contact: Name" onChangeText={(e) => setPocName(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={pocContact} placeholder="Point of Contact: Mobile" onChangeText={(e) => setPocContact(e)} />
                        <TextInput style={{ marginVertical: 2 }} keyboardType={"text"} value={lastSeenLocation} placeholder="Last seen location" onChangeText={(e) => setLastSeenLocation(e)} />
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('darkorange')}
                                onPress={() => setDatePickerVisibility(true)}>
                                <View style={[{ backgroundColor: 'orange', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }, uri != '' && { marginBottom: 10 }]}>
                                    <Text style={{ color: 'white' }}>
                                        Last Seen Date/Time
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            {
                                datetime != "" &&
                                <View style={{ marginTop: 10 }}>
                                    <Text>
                                        {moment(datetime).format('D/M/YYYY h:mm a')}
                                    </Text>
                                </View>
                            }
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="datetime"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('darkorange')}
                                onPress={() => showImagePicker()}>
                                <View style={[{ backgroundColor: 'orange', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }, uri != '' && { marginBottom: 10 }]}>
                                    <Text style={{ color: 'white' }}>
                                        {uri != "" ? "Replace Image" : "Add Image"}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            {
                                uri != '' &&
                                <Image style={{ height: 100, width: 100, resizeMode: 'contain' }} source={{ uri }} />
                            }
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableNativeFeedback
                                onPress={() => submit()}>
                                <View style={[{ backgroundColor: '#4000ff', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }, uri != '' && { marginBottom: 10 }]}>
                                    <Text style={{ color: 'white' }}>
                                        Submit
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

// "name": "Fabian Lim",
// "age": 15,
// "conditions": "Autism",
// "remarks": "Socially awkward and shy, sensitive to loud noises",
// "clothing": "Blue Stripped T-Shirt, Jeans",
// "datetime": 1585553400,
// "pocName": "Teo Xiao Peng",
// "pocContact": "91234567",
// "lastSeenLocation": "Pasir Ris Walk, Street 21",
// "photo":