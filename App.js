import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { AppearanceProvider } from "react-native-appearance";

import LoginScreen from "./src/screen/employee/account/LoginScreen";
import RegisterScreen from "./src/screen/employee/account/RegisterScreen";
import CustomerPath from "./src/screen/paths/CustomerPath";
import EmployeePath from "./src/screen/paths/EmployeePath";
import SplashScreen from "./src/screen/SplashScreen";
import * as api from "./src/service/BarApiService.js";
import * as storage from "./src/service/BarStorageService";
import { AuthContext } from "./src/service/Context.js";
import { ThemeProvider } from "./src/theme/ThemeManager";

const SignInNavigator = createStackNavigator();

export function SignInStack({ state }) {
  return (
    <NavigationContainer>
      <SignInNavigator.Navigator headerMode="none">
        <SignInNavigator.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ context: AuthContext }}
        />
        <SignInNavigator.Screen
          name="Register"
          component={RegisterScreen}
          initialParams={{ context: AuthContext }}
        />
        <SignInNavigator.Screen
          name="App"
          component={EmployeePath}
          initialParams={{ context: AuthContext }}
        />
      </SignInNavigator.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [bars, setBars] = React.useState([]);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await storage.getAccessToken();
      } catch (e) {
        userToken = null;
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    getBars();

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let accessToken;
        try {
          accessToken = await api.login(data.email, data.password);
          const bars = await api.getBars();
          if (bars[0] !== undefined) {
            await storage.storeActiveBar(bars[0].id.toString());
          }

          dispatch({ type: "SIGN_IN", token: accessToken });
        } catch (e) {
          alert(e);
        }
      },
      signOut: async () => {
        await api.logout();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        api
          .signUp(
            data.email,
            data.userName,
            data.password,
            data.firstName,
            data.lastName,
          )
          .then(() => {
            let accessToken = api
              .login(data.email, data.password)
              .catch((error) => alert(error));

            dispatch({ type: "SIGN_IN", token: accessToken });
          })
          .catch((error) => {
            alert(error);
          });
      },
    }),
    [],
  );

  const getBars = () => {
    api
      .getBars()
      .then((json) => {
        setBars(json);
        console.log(bars);
      })
      .catch("No bars found");
  };

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return (
      <ThemeProvider>
        <SplashScreen />
      </ThemeProvider>
    );
  }

  return (
    <AppearanceProvider>
      <ThemeProvider>
        <AuthContext.Provider value={authContext}>
          {/* {state.userToken !== null && bars.length > 0 ? (
            <EmployeePath state={state} />
          ) : state.userToken !== null && bars.length === 0 ? (
            <CustomerPath />
          ) : (
            <SignInStack />
          )} */}
          <CustomerPath />
        </AuthContext.Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
