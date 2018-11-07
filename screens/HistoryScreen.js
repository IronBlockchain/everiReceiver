import React from 'react';
import { ScrollView, FlatList, ListView, StyleSheet, Text , TouchableOpacity, Image, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {history, findImage} from "../utils/history";

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
  };

  render() {
    return (
      <FlatList style={styles.list} data={history}
          renderItem={({item}) =>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={()=>this.props.navigation.navigate('Token', { token: item.value })}>
              <Image source={findImage(item.key)} style={styles.itemImage}/>
              <View style={styles.itemText}>
                <Text style={styles.itemTitle}>{item.value.title} </Text>
                <Text style={styles.itemToken}>{item.value.tokenName} </Text>
              </View>
            </TouchableOpacity>
          }
        />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemToken: {
  },
  itemText: {
    justifyContent:'center',
    paddingLeft: 30,
    aspectRatio: 2,
  },
  itemImage: {
    width: 80,
    aspectRatio: 1,
  }
});
