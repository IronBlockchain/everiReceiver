import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {HomeScreenStyles as styles, infoColor} from "../styles/HomeScreenStyle";
import TokenProgress from '../components/TokenProgress';
import {messageRouter, messageTypes} from "../utils/messages";
import { BarCodeScanner, Permissions, Video} from 'expo';
import _ from 'lodash'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super();
    this.state = {
      message: 'no message',
      backgroundColor: infoColor,
      displayImage: false,
      showAction: false,
      actionYesText: 'Yes',
      actionNoText: 'Cancel',
      actionYes: _.identity,
      actionNo: _.identity,
      started: false,
      mode: null,
      openScanner: false,
      showDeliverAction: true,
      displayVideo:false,
      deliverMessage: 'When customer is out of home, request access by QR code',
      onDeliverAction: ()=> this.setState({
        openScanner: true,
        showDeliverAction: false,
      }),
      deliverActionText: "Scan User code",
    };
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    const ws = new WebSocket('ws://192.168.178.22:1337', (result, code) => {
      console.log(result, code)
    })
    this.ws = ws;
    ws.onopen = () => {
      // connection opened
      console.log('is opened')
      // ws.send('test'); // send a message
    };
    ws.onmessage = _.curry(messageRouter)(this.setState.bind(this))(ws)
  }

  generateAction() {
    if(this.state.showAction){
      return(
        <View style={styles.messageActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={this.state.actionYes}>
            <Text>{this.state.actionYesText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.state.actionNo}>
            <Text>{this.state.actionNoText}</Text>
          </TouchableOpacity>
        </View>
      )
    }else {
      return(
        <View style={styles.messageActions}/>
      )
    }
  }

  onSuccess(e) {
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  generateView () {
    // switch (this.state.message) {
    //   case 1
    // }
    if(this.state.mode==='deliver'){
      return (
        <View>
          <View style={_.merge(styles.actionsContainer, {backgroundColor: this.state.backgroundColor})}>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                {this.state.deliverMessage}
              </Text>
              {this.state.showDeliverAction &&
                <Button title={this.state.deliverActionText} onPress={this.state.onDeliverAction}/>}

            </View>
            {this.generateImage()}

          </View>
          <View style={{height:100}}>
            {this.state.hasCameraPermission && this.state.openScanner && <BarCodeScanner
              onBarCodeScanned={()=>{
                this.setState({
                  openScanner: false,
                  deliverMessage: 'Now waiting for the response from User',
                  displayImage: true,
                  showAction: false,
                })
                this.ws.send(JSON.stringify({type: messageTypes.deliver.INIT_REQUEST}));
              }}
              style={StyleSheet.absoluteFill}
            />}
          </View>
        </View>
      )
    } else if (this.state.mode ==='user'
      // && this.state.started
    ){
    return(
      <View style={_.merge(styles.actionsContainer, {backgroundColor: this.state.backgroundColor})}>
        <TokenProgress/>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {this.state.message}
          </Text>
          {this.generateAction()}
        </View>
        {this.generateImage()}
      </View>
    )}else if (this.state.mode ==='user'){
      return(
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Your package and access manager
            </Text>
          </View>
      )
    }
  }

  generateImage () {
    if(this.state.displayVideo
      || true
    ){
      return(<Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        style={{ width: 300, height: 300 }}
      />)
    } else if (this.state.displayImage) {
      return (
        <View style={styles.goodContainer}>
          <Image
            source={require('../assets/images/cook.jpg')}
            style={styles.goodImage}
          />
          <View style={styles.goodDescription}>
            <Text style={styles.good_title}>
              Cook machine
            </Text>
            <Text>
              Heißgetränkeautomat mit Auslaufhahn
              {"\n"}
              für 14 1-Liter-Rundrandgläser
              {"\n"}
              white & black
            </Text>
            <Text style={styles.good_seller}>
              Buy from: Amazon EU S.a.r.L.
            </Text>
            <Text style={styles.good_price}>
              EUR 69.99
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/EveriDeliver.jpg')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {/*{this._maybeRenderDevelopmentModeWarning()}*/}


          </View>

          {!this.state.mode && <View>
            <Button title='deliver' onPress={()=>this.setState({mode: 'deliver', displayImage: true})}/>
            <Button title='user' onPress={()=>this.setState({mode: 'user'})}/>
          </View>}

          {this.generateView()}

          <View style={styles.helpContainer}>
            <Button onPress={this._handleHelpPress} style={styles.helpLink} title='Reload'>
            </Button>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Powered By</Text>

          <Image
            source={
              __DEV__
                ? require('../assets/images/EveriToken.png')
                : require('../assets/images/EveriToken.png')
            }
            style={styles.poweredImage}
          />

          <Image
            source={require('../assets/images/blockweise.png')}
            style={styles.poweredImage}
          />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    Expo.Util.reload()
    // WebBrowser.openBrowserAsync(
    //   'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    // );
  };
}
