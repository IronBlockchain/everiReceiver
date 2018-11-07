import React, { Component } from "react";
import { ProgressBarAndroid, StyleSheet, View, Platform, ProgressViewIOS} from 'react-native'

const barColor = "#2196F3";
const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    padding: 20
  },
  bar: {
    // width:200,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    alignSelf: "stretch"
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
          progress={this.props.progress}
        /> :
        <ProgressViewIOS
          progressTintColor={barColor}
          trackTintColor={'#eee'}
          style={styles.bar}
          progress={this.props.progress}
        />}
      </View>
    );
  }
}

