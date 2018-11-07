import {Platform, StyleSheet} from "react-native";
import _ from 'lodash';
import {inlineImage} from "./utilStyle";

export const infoColor = '#DAF7A6'

export const button = {
  margin: 10,
  height: 30,
  width: 110,
  justifyContent: 'center',
  alignItems: 'center',
  // alignSelf:'center',
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
}

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionsContainer: {
    flex:1,
    margin:15,
    borderRadius:8,
    borderWidth: 0.5,
    height:350,
    borderColor: '#d6d7da',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  videoStyle: {
    alignSelf:'stretch',
    justifyContent:'center',
    alignItems: 'center',
  },
  goodContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  goodDescription: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  good_title: {
    color: 'grey',
    fontSize: 20,
  },
  good_seller: {
    fontStyle: 'italic'
  },
  good_price: {
    fontWeight: 'bold'
  },
  goodImage: {
    width: 150,
    alignSelf: 'center',
    height: 150,
    resizeMode: 'contain',
  },
  poweredImage: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  messageContainer: {
    height:100,
  },
  messageText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
  },
  messageActions: {
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  actionButton: _.merge(button,{

  }),
  cancelButton: _.merge(button,{

  }),
  tabBarInfoContainer: _.merge({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 3,
  }, inlineImage),
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
});