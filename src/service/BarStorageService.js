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
  try {
    const jwt = await AsyncStorage.getItem('@jwt')
    if(jwt !== null) {
      return jwt;
    }
  } catch(e) {
    Alert.prompt("Error", "Could not retrieve login credentials");
  }
}

