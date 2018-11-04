import React, { Component } from "react";
import { ProgressBarAndroid, StyleSheet, View, Platform, ProgressViewIOS} from 'react-native'

const barColor = "#2196F3";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  },
  bar: {
    width:200,
    flex:1
  }
});

export default class TokenProgress extends Component {

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'android'?
        <ProgressBarAndroid
          style={styles.bar}
          color={barColor}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.2}
        /> :
        <ProgressViewIOS
          progressTintColor={barColor}
          style={styles.bar}
          progress={0.2}
        />}
      </View>
    );
  }
}

