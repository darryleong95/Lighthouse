import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Card,
  Icon,
  Avatar,
  Header,
} from 'react-native-elements';

import moment from 'moment';

export default class Cases extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  
  constructor(props) {
      super(props);
      this.state = {
          data: require('../../data/sample.json')
      }
      this.addItemToData = this.addItemToData.bind(this);
  }

  addItemToData(newData) {
      let data = this.state.data;
      data.push(newData);
      this.setState({
          data: data
      });
  }

  render() {
    return (
      <View style={{flex: 1,}}>
        <Header
          backgroundColor='#ee6969'
          centerComponent={{
            text: 'Missing People List',
            style: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
          }}
          rightComponent={<Icon color="#fff" name="add" onPress={() => this.props.navigation.navigate('AddCase')}/>}
        />
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('CaseDetails', {item: item})
                  }>
                  <Card containerStyle={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Avatar
                        containerStyle={{marginRight: 15, flex: 1}}
                        rounded
                        size="medium"
                        source={{
                          uri: item.photo,
                        }}
                      />
                      <View style={{flex: 5}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 8,
                          }}>
                          {item.name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Age: </Text>
                          <Text>{item.age}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Conditions: </Text>
                          <Text>{item.conditions}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Last Seen: </Text>
                          <Text>{item.lastSeenLocation}</Text>
                        </View>
                      </View>
                      <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Icon name="chevron-right" />
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 3,
  },
});
