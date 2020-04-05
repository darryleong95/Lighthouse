import React from 'react';
import {View, Text, Image, ScrollView, Linking, } from 'react-native';
import { Card, ListItem, Header, Icon } from 'react-native-elements';
import moment from 'moment';

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

    render () {
      return (
        <View style={{flex: 1,}}>
        <Header
          backgroundColor='#ee6969'
          leftComponent={<Icon color="#fff" name="chevron-left" onPress={() => this.props.navigation.pop()}/>}
          centerComponent={{
            text: 'Case Report',
            style: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
          }}
        />
        <ScrollView>
        {this.state.item && <Card containerStyle={{flex:1, marginBottom: 10, borderWidth: 2, padding: 5}} >
          <Image
            style={{height: 275, margin: 10}}
            resizeMode="cover"
            source={{ uri: this.state.item.photo }}
          />
          <ListItem
            title="Name"
            titleStyle={{fontWeight:'bold', marginBottom: 5}}
            subtitle={this.state.item.name}
            subtitleStyle={{color:'grey'}}
            rightSubtitle={"Age: " + this.state.item.age}
            bottomDivider
          />
          {/* <ListItem
            title="Age"
            titleStyle={{fontWeight:'bold',}}
            rightTitle={this.state.item.age}
            bottomDivider
          /> */}
          <ListItem
            title="Conditions"
            titleStyle={{fontWeight:'bold',}}
            rightTitle={this.state.item.conditions}
            bottomDivider
          />
          <ListItem
            title="Last Seen @"
            titleStyle={{fontWeight:'bold', marginBottom: 5}}
            subtitle={this.state.item.lastSeenLocation + "\nTime: " + moment(this.state.item.datetime).format('DD-MM-YYYY h:mm a')}
            subtitleStyle={{color:'grey'}}
            bottomDivider
          />
          <ListItem
            title="Clothing"
            titleStyle={{fontWeight:'bold', marginBottom:5}}
            subtitle={this.state.item.clothing}
            subtitleStyle={{color:'grey'}}
            bottomDivider
          />
          <ListItem
            title="Remarks"
            titleStyle={{fontWeight:'bold', marginBottom:5}}
            subtitle={this.state.item.remarks}
            subtitleStyle={{color:'grey'}}
            bottomDivider
          />
          <ListItem
            title="POC"
            titleStyle={{fontWeight:'bold', marginBottom: 5}}
            // rightTitle={this.state.item.pocName}
            // rightSubtitle={this.state.item.pocContact}
            subtitle={this.state.item.pocName}
            rightSubtitle={this.state.item.pocContact}
            onPress={() => Linking.openURL(`tel:${this.state.item.pocContact}`)
}
          />

            </Card>}
            </ScrollView>


            </View>
        )
    }
}