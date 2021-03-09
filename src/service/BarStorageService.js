import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function storeJWT(jwt){
  try {
    await AsyncStorage.setItem('@jwt', jwt);
  } catch (e) {
    Alert.prompt("Error", "Could not store login credentials");
  }
}

export async function getJWT() {
  const jwt = await AsyncStorage.getItem('@jwt')
    if(jwt !== null) {
      console.log(jwt)
      return jwt;
    }
    throw "Could not retrieve login credentials"
}

export async function removeJWT() {
  try {
    await AsyncStorage.removeItem('@jwt')
  } catch(e) {
    console.error(e);
  }
}

