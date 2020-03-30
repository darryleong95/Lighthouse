import React from 'react'
import { View, FlatList, SafeAreaView, Image, Text, StyleSheet } from 'react-native'
import moment from 'moment'

export const Cases = () => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item name={item.name} datetime={item.datetime} photo={item.photo} location={item.location} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const Item = (props) => {
    const { name, datetime, photo, location } = props
    return (
        <View style={styles.item}>
            <Image style={{ height: 300, width: '100%', resizeMode: 'cover' }} source={{ uri: photo }} />
            <View style={{ width: 300, justifyContent: 'flex-start', paddingVertical: 10 }}>
                <Text style={[styles.text, { fontSize: 15 }]}>
                    {name}
                </Text>
                <Text style={styles.text}>
                    Last Seen: {moment(datetime).format('DD-MM-YYYY h:mm a')}
                </Text>
                <Text style={styles.text}>
                    Location: {location}
                </Text>
            </View>
        </View>
    )
}

const data = [
    {
        id: 'asdsasd123',
        name: 'Fabian Lim',
        datetime: 1585553400,
        location: 'Pasir Ris Walk, Street 21',
        photo: 'https://scontent-xsp1-1.xx.fbcdn.net/v/t31.0-8/p960x960/26220848_10212599482494596_4622631169134600720_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=wR7fBF3njXkAX-imurS&_nc_ht=scontent-xsp1-1.xx&_nc_tp=6&oh=81427776ae9e12c8be3df99bb065ac7d&oe=5EA59BC4'
    },
    {
        id: 'asd1i2be',
        name: 'Rebecca Lee',
        datetime: 1585553400,
        location: 'Serangoon Gardens',
        photo: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.0-9/12651012_10205573025791895_3484017309458210842_n.jpg?_nc_cat=100&_nc_sid=dd9801&_nc_ohc=nmXC3y_5aMwAX9Zry5Y&_nc_ht=scontent-xsp1-2.xx&oh=e2e868cd1f977bb922b8f41a38362d7f&oe=5EA716A5'
    },
    {
        id: 'asd1i2bdase',
        name: 'Teo Wei Xuan Victoria',
        datetime: 1585553400,
        location: 'Tampines One',
        photo: 'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/35282783_10209502228473133_5693860542561648640_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=xc3w8b85ERsAX9jdgCy&_nc_ht=scontent-xsp1-1.xx&oh=700d9d09c67dd8ff72e8f7d3f35c0303&oe=5EA68957'
    }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
        paddingVertical: 3
    }
})