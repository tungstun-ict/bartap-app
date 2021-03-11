import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeaccessToken(accessToken){
  try {
    await AsyncStorage.setItem('@accessToken', accessToken);
  } catch (e) {
    throw "Could not store login credentials"
  }
}

export async function getaccessToken() {
  const accessToken = await AsyncStorage.getItem('@accessToken')
    if(accessToken !== null) {
      return accessToken;
    }
    throw "Could not retrieve login credentials"
}

export async function removeaccessToken() {
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

