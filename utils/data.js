import { AsyncStorage } from "react-native"
import {listKey} from "../config";
import _ from 'lodash'

export const setData = async (value) => {
  try {
    const list = await AsyncStorage.getItem(listKey);
    let neu;
    if(_.isEmpty(list)){
      neu = []
    } else {
      neu = _.concat(list, value)
    }
    await AsyncStorage.setItem(listKey, neu);
  } catch (error) {
    // Error saving data
  }
}

export const getData = async (key) => {
  try {
    const list = await AsyncStorage.getItem(listKey);
    const value = _.find({key})
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
}

export const getList = () => {
  try {
    const value = AsyncStorage.getItem(listKey, (err, result) => {
      console.log('err is', err, result)
      if (!_.isEmpty(result)) {
        console.log(value);
        return result
      }else {
        return [];
      }
    });
  } catch (error) {
    // Error retrieving data
  }
}