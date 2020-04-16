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
  AsyncStorage,
  Platform,
} from 'react-native';
import {
  Card,
  Icon,
  Avatar,
  Header,
} from 'react-native-elements';

import moment from 'moment';
import axios from 'axios'

import file from '../../data/sample.json'

export default class Cases extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount = async () => {
    console.log('mounting...')
    await AsyncStorage.removeItem("cases")
    this.poll()
    this.startPoll()
  }

  componentWillUnmount = () => {
    console.log('unmounting...')
    clearInterval(this.state.intervalId)
  }

  startPoll = () => {
    let intervalId = setInterval(this.poll, 1000);
    this.setState({ intervalId: intervalId })
  }

  poll = async () => {
    let data = await AsyncStorage.getItem('cases')
    if (data == null) {
      await AsyncStorage.setItem('cases', JSON.stringify(file))
      this.setState({ data: file })
    } else {
      this.setState({ data: JSON.parse(data) })
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
          centerComponent={{
            text: 'Missing People List',
            style: { color: '#fff', fontSize: 17, fontWeight: 'bold', alignSelf: 'center' },
          }}
          rightComponent={<Icon color="#fff" name="add" onPress={() => this.props.navigation.navigate('AddCase')} />}
        />
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('CaseDetails', { item: item })
                  }>
                  <Card containerStyle={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Avatar
                        containerStyle={{ marginRight: 15, flex: 1 }}
                        rounded
                        size="medium"
                        source={{
                          uri: item.photo,
                        }}
                      />
                      <View style={{ flex: 5 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 8,
                          }}>
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
                          <Text>Last Seen: </Text>
                          <Text>{item.lastSeenLocation}</Text>
                        </View>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
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
