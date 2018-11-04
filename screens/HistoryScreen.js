import React from 'react';
import { ScrollView, FlatList, ListView, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <FlatList style={styles.container} data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.item}>
              <Text> {item.key} </Text>
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
