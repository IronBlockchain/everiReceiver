import React from "react";
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from "react-native";

const paramsName = 'name'

export default class TokenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(paramsName, 'Token Detail'),
    };
  };

  constructor (props) {
    super();
    this.state = {message: 'no message'};
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({message: this.props.navigation.getParam(paramsName, 'No Name')})
    }, 2000)
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>{navigation.getParam(paramsName, 'No Name')}</Text>
        <Text>{this.state.message}</Text>
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
