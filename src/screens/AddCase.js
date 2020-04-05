import React from 'react';
import {View} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class AddCase extends React.Component {
    static navigationOptions = {
        headerShown: false,
      };



    render() {
        return (
            <View style={{flex: 1}}>
            <Header
                backgroundColor='#ee6969'
                leftComponent={<Icon color="#fff" name="chevron-left" onPress={() => this.props.navigation.pop()}/>}
                centerComponent={{
                    text: 'Report New Case',
                    style: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
                }}
            />
            <View style={{borderWidth: 2, flex: 1, margin: 10}}>

            </View>
            </View>
        )
    }
}