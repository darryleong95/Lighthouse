import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, TouchableNativeFeedback, AsyncStorage, Platform, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Header, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment'
import { NavigationActions, StackActions } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                    leftComponent={
                        <TouchableOpacity onPress={goBack}>
                            <Icon color="#fff" name="chevron-left" />
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: 'Report New Case',
                        style: { color: '#fff', fontSize: 17, fontFamily: 'AirbnbCereal-Medium' },
                    }}
                />
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <View style={{ width: '90%', }}>
                        <Text style={{ fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a', fontSize: 15, marginTop: 15, marginBottom: 5 }}>
                            General Information
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput style={[styles.input, { width: '49%' }]} keyboardType={"text"} value={name} placeholder="Name" onChangeText={(e) => setName(e)} />
                            <TextInput style={[styles.input, { width: '49%' }]} keyboardType={"text"} value={age} placeholder="Age" onChangeText={(e) => setAge(e)} />
                        </View>
                        <TextInput style={styles.input} keyboardType={"text"} value={conditions} placeholder="Conditions" onChangeText={(e) => setConditions(e)} />
                        <TextInput style={styles.input} keyboardType={"text"} value={remarks} placeholder="Remarks" onChangeText={(e) => setRemarks(e)} />
                        <TextInput style={styles.input} keyboardType={"text"} value={clothing} placeholder="Clothing" onChangeText={(e) => setClothing(e)} />
                        <TextInput style={styles.input} keyboardType={"text"} value={lastSeenLocation} placeholder="Last seen location" onChangeText={(e) => setLastSeenLocation(e)} />
                        <View>
                            <Text style={{ fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a', fontSize: 15, marginTop: 15, marginBottom: 5 }}>
                                Point of Contact
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput style={[styles.input, { width: '49%' }]} keyboardType={"text"} value={pocName} placeholder="Name" onChangeText={(e) => setPocName(e)} />
                                <TextInput style={[styles.input, { width: '49%' }]} keyboardType={"text"} value={pocContact} placeholder="Mobile" onChangeText={(e) => setPocContact(e)} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                            <View style={{ width: '49%' }}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('#529fec')}
                                    onPress={() => setDatePickerVisibility(true)}>
                                    <View style={[{ backgroundColor: '#529fec', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }, uri != '' && { marginBottom: 10 }]}>
                                        <Text style={{ color: 'white', fontFamily: 'AirbnbCereal-Book' }}>
                                            {datetime == '' ? 'Last Seen Date/Time' : moment(datetime).format('D/M/YYYY h:mm a')}
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{ width: '49%' }}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('#52ec9f')}
                                    onPress={() => showImagePicker()}>
                                    <View style={[{ backgroundColor: '#52ec9f', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }, uri != '' && { marginBottom: 10 }]}>
                                        <Text style={{ color: 'white', fontFamily: 'AirbnbCereal-Medium', textAlign: 'center' }}>
                                            {uri != "" ? <Text>Image Uploaded{'\n'}<Text style={{ fontFamily: 'AirbnbCereal-Book', fontSize: 10 }}>Click to Replace</Text></Text> : "Add Image"}
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        {
                            uri != '' &&
                            <Image style={{ height: 160, width: 140, resizeMode: 'contain', alignSelf: 'center', marginVertical: 10 }} source={{ uri }} />
                        }
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date()}
                        />
                        <View style={[{ width: '100%', justifyContent: 'center', alignItems: 'center' }, uri.length == 0 && { marginTop: 180 }]}>
                            <TouchableNativeFeedback
                                onPress={() => submit()}>
                                <View style={[{ backgroundColor: '#ec5252', height: 60, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }, uri != '' && { marginBottom: 10 }]}>
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

const styles = StyleSheet.create({
    input: {
        marginVertical: 5,
        fontFamily: 'AirbnbCereal-Book',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5
    }
})

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