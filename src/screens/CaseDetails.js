import React from 'react';
import { View, Text, Image, ScrollView, Linking, Platform, Dimensions, } from 'react-native';
import { Card, ListItem, Header, Icon } from 'react-native-elements';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CaseDetails extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };



  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item'),
    }
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header
          statusBarProps={{ translucent: true }}
          containerStyle={Platform.select({
            android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : { height: 100 },
          })}
          backgroundColor='#ec5252'
          leftComponent={
            <TouchableOpacity onPress={this.props.navigation.pop} >
              <Icon color="#fff" name="chevron-left" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Case Report',
            style: { color: '#fff', fontSize: 17, fontFamily: 'AirbnbCereal-Medium' },
          }}
        />
        <ScrollView>
          {this.state.item && <Card containerStyle={{ flex: 1, marginBottom: 10, borderWidth: 2, padding: 0, elevation: 0, borderWidth: 0, borderRadius: 5, paddingBottom: 10 }} >
            <Image
              style={{ width: '100%', height: Dimensions.get('window').width, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
              resizeMode="cover"
              source={{ uri: this.state.item.photo }}
            />
            <ListItem
              title="Name"
              titleStyle={{ marginBottom: 5, fontFamily: 'AirbnbCereal-Medium' }}
              subtitle={this.state.item.name}
              subtitleStyle={{ color: '#6f6f6f', fontFamily: 'AirbnbCereal-Book' }}
              rightSubtitle={"Age: " + this.state.item.age}
              rightSubtitleStyle={{ fontFamily: 'AirbnbCereal-Book' }}
            />
            <HR />
            <ListItem
              title="Conditions"
              titleStyle={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15 }}
              rightTitle={this.state.item.conditions}
              rightTitleStyle={{ fontFamily: 'AirbnbCereal-Book', fontSize: 15 }}
            />
            <HR />
            <ListItem
              title="Last Seen @"
              titleStyle={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15, marginBottom: 5 }}
              subtitle={
                <Text style={{ color: '#6f6f6f', fontFamily: 'AirbnbCereal-Book', marginVertical: 2 }}>
                  <Text style={{ color: '#2a2a2a', fontFamily: 'AirbnbCereal-Medium' }}>Location:  </Text>
                  {this.state.item.lastSeenLocation}
                  <Text style={{ color: '#2a2a2a', fontFamily: 'AirbnbCereal-Medium' }}>{'\n'}Time:  </Text>
                  {moment(this.state.item.datetime).format('DD/MMM/YYYY h:mm a')}
                </Text>}
            />
            <HR />
            <ListItem
              title="Clothing"
              titleStyle={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15, marginBottom: 5 }}
              subtitle={this.state.item.clothing}
              subtitleStyle={{ color: '#6f6f6f', fontFamily: 'AirbnbCereal-Book', fontSize: 14 }}
            />
            <HR />
            <ListItem
              title="Remarks"
              titleStyle={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15, marginBottom: 5 }}
              subtitle={this.state.item.remarks}
              subtitleStyle={{ color: '#6f6f6f', fontFamily: 'AirbnbCereal-Book' }}
            />
            <HR />
            <ListItem
              title="POC"
              titleStyle={{ fontFamily: 'AirbnbCereal-Medium', fontSize: 15, marginBottom: 5 }}
              subtitle={this.state.item.pocName}
              rightSubtitle={this.state.item.pocContact}
              rightSubtitleStyle={{ fontFamily: 'AirbnbCereal-Book', color: '#2a2a2a' }}
              onPress={() => Linking.openURL(`tel:${this.state.item.pocContact}`)
              }
            />
          </Card>}
        </ScrollView>


      </View>
    )
  }
}

const HR = () => {
  return (
    <View style={{ width: '90%', borderBottomWidth: 0.5, borderColor: '#c6c6c6', alignSelf: 'center' }} />
  )
}