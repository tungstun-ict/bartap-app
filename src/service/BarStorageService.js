import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeAccessToken(accessToken){
  try {
    await AsyncStorage.setItem('@accessToken',accessToken);
  } catch (e) {
    throw e;
  }
}

export async function getAccessToken() {
  const accesToken = await AsyncStorage.getItem('@accessToken')
    if(accesToken !== null) {
      return accesToken;
    }
    throw "Could not retrieve login credentials"
}

export async function removeAccessToken() {
  try {
    await AsyncStorage.removeItem('@accessToken')
  } catch(e) {
    console.error(e);
  }
}

export async function storeRefreshToken(token){
  try {
    await AsyncStorage.setItem('@refreshToken', token);
  } catch (e) {
    throw "Could not store refresh token"
  }
}

export async function getRefreshToken() {
  const token = await AsyncStorage.getItem('@refreshToken')
    if(token !== null) {
      return token;
    }
    throw "Could not retrieve refresh token"
}

export async function removeRefreshToken() {
  try {
    await AsyncStorage.removeItem('@refreshToken')
  } catch(e) {
    console.error(e);
  }
}

export async function storeActiveBar(bar){
  try {
    await AsyncStorage.setItem('@activeBar', bar);
  } catch (e) {
    throw "Could not store active bar"
  }
}

export async function getActiveBar() {
  const bar = await AsyncStorage.getItem('@activeBar')
    if(bar !== null) {
      return bar;
    }
    throw "Could not retrieve active bar"
}

export async function removeActiveBar() {
  try {
    await AsyncStorage.removeItem('@activeBar')
  } catch(e) {
    console.error(e);
  }
}

