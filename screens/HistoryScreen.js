import React from 'react';
import { ScrollView, FlatList, ListView, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {history, findImage} from "../utils/history";

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <FlatList style={styles.container} data={history}
          renderItem={({item}) =>
            <TouchableOpacity
              style={styles.item}
              onPress={()=>this.props.navigation.navigate('Token', { tokenName: item.key })}>
              <Text> {item.value.title} </Text>
            </TouchableOpacity>
          }
        />
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
