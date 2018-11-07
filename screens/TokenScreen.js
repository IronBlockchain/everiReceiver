import React from "react";
import {FlatList, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import {findImage} from "../utils/history";
import {HomeScreenStyles as itemStyles} from '../styles/HomeScreenStyle'
import _ from 'lodash'

const paramsName = 'token'

const SectionHeader = (title) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = children => {
  return (
    <View style={styles.sectionContentContainer}>
      {children}
    </View>
  );
};

const renderSection = (title, children) => {
  return (
    <View>
    {SectionHeader(title)}
    {SectionContent(children)}
    </View>)
}

const renderListObject = (items) => {
  return(
  <View style={styles.transactionContainer}>
    {Object.entries(items).map(([describe, hash])=> (
      <View style={styles.transaction} key={hash}>
        <View>
          <Text style={styles.transactionDescribe}>{describe}</Text>
        </View>
        <View>
          <Text style={styles.transactionHash}>{'Hash: ' + hash}</Text>
        </View>
      </View>
    ))}
  </View>)}

const renderList = (items) => {
  const renderMeta = _.map(items, (item)=>({
    key:item.key + '  ' + item.value,
    value: item.creator,
  }))
  return(
    <View style={styles.transactionContainer}>
      {renderMeta.map(item=> (
        <View style={styles.transaction} key={item.key}>
          <View>
            <Text style={styles.transactionDescribe}>{item.key}</Text>
          </View>
          <View>
            <Text style={styles.transactionHash}>{'Issuer: ' + item.value}</Text>
          </View>
        </View>
      ))}
    </View>)
}



export default class TokenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(paramsName, {title: 'Token Detail'}).title,
    };
  };

  render() {
    const initParams = {
      key:"1",
      title: '',
      subTitle: '',
      describe: '',
      subDescribe:'0',
      price: '',
      tokenName: '',
      image: null,
      owner: [],
      transactions: {},
      block: '#00000000',
      metas:
        [ { key: 'Taobao',
          value: 'access token validated',
          creator: '[A] EVT79RtRtLRjpSKxMam2VYEYTN21E5Qv6Fb8CJvL5soDsaLQmBxzr' }]
    }
    const token = this.props.navigation.getParam(paramsName, initParams)
    return (
      <ScrollView style={styles.container}>
        <View style={itemStyles.goodContainer}>
          <Image
            source={findImage(token.key)}
            style={styles.itemImage}
          />
          <View style={styles.itemTextContainer}>
            <Text style={itemStyles.good_title}>
              {token.title}
            </Text>
            <Text>
              {token.subTitle}
              {"\n"}
              {token.describe}
              {"\n"}
              {token.subDescribe}
            </Text>
            <Text style={itemStyles.good_seller}>
              Buy from: Amazon EU S.a.r.L.
            </Text>
            <Text style={itemStyles.good_price}>
              {'€ ' + token.price}
            </Text>
          </View>
        </View>
        <View styl={styles.titleContainer}>
          <Text style={styles.tokenTitle}> Token Information</Text>
        </View>
        {renderSection('Block Number', <Text>{token.block}</Text>)}
        {renderSection('Token Owner', <Text>{token.owner[0]}</Text>)}
        {renderSection('Transactions',renderListObject(token.transactions))}
        {renderSection('Meta Data', renderList(token.metas))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  transactionContainer: {
    flex:1,
  },
  transaction: {
    height:70,
    borderBottomWidth:1,
  },
  transactionDescribe: {
    fontWeight: 'bold',
    color: '#578'
  },
  transactionHash: {
  },
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  itemImage: {
    flex:2,
    resizeMode: 'contain',
  },
  itemTextContainer: {
    flex:3,
    padding:20,
  },
  tokenTitle:{
    textAlign: 'center',
    fontSize: 25,
  },
  titleContainer: {
    flex:1,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
});
