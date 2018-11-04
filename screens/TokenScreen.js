import React from "react";
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from "react-native";

export default class TokenScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>{navigation.getParam('name', 'No Name')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20
  }
});
