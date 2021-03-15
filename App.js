import { NavigationContainer, StackActions } from "@react-navigation/native";
import { ThemeProvider } from 'react-native-elements';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState, createContext } from "react";
import SessionScreen from "./src/screen/session/SessionScreen";
import CustomersScreen from "./src/screen/customer/CustomersScreen";
import AddCustomerScreen from "./src/screen/customer/AddCustomerScreen";
import DrawerLayout from "./src/layout/DrawerLayout";
import { colors, mock } from "./src/theme/variables";
import { StyleSheet } from "react-native";
import CustomerOverviewScreen from "./src/screen/customer/CustomerOverviewScreen";
import DrinkCategoriesScreen from "./src/screen/drinks/DrinkCategoriesScreen";
import AddDrinksScreen from "./src/screen/drinks/AddDrinkScreen";
import SessionBillScreen from "./src/screen/session/SessionBillScreen";
import PastSessionsScreen from "./src/screen/session/PastSessionsScreen";
import LoginScreen from "./src/screen/account/LoginScreen";
import NewSessionScreen from "./src/screen/session/NewSessionScreen";
import AccountScreen from "./src/screen/account/AccountScreen";
import * as storage from "./src/service/BarStorageService.js";
import * as api from "./src/service/BarApiService.js";
import SplashScreen from "./src/screen/SplashScreen";
import { AuthContext } from "./src/service/Context.js";
import AddCustomerSession from "./src/screen/session/AddCustomerSession";
import StockOverviewScreen from "./src/screen/stock/StockOverviewScreen";
import AddCategoryScreen from "./src/screen/stock/AddCategoryScreen";
import AddProductStockScreen from "./src/screen/stock/AddProductStockScreen";
import CategoryOverviewScreen from "./src/screen/stock/CategoryOverviewScreen";
const DrawerNavigator = createDrawerNavigator();
const CustomersNavigator = createStackNavigator();
const PastNavigator = createStackNavigator();
const SessionNavigator = createStackNavigator();
const PaymentNavigator = createStackNavigator();
const StockNavigator = createStackNavigator();
const AccountNavigator = createStackNavigator();
const SignInNavigator = createStackNavigator();

export function CustomersStack() {
  return (
    <CustomersNavigator.Navigator
      headerMode="none"
      initialRouteName="Customers"
    >
      <CustomersNavigator.Screen name="Customers" component={CustomersScreen} />
      <CustomersNavigator.Screen
        name="Add new customer"
        component={AddCustomerScreen}
      />
      <CustomersNavigator.Screen
        name="Customer overview"
        component={CustomerOverviewScreen}
      />
      <CustomersNavigator.Screen
        name="Customer Bill"
        component={SessionBillScreen}
      />
    </CustomersNavigator.Navigator>
  );
}

export function PastStack() {
  return (
    <PastNavigator.Navigator
      headerMode="none"
      initialRouteName="Sessions Overview"
    >
      <PastNavigator.Screen
        name="Sessions Overview"
        component={PastSessionsScreen}
      ></PastNavigator.Screen>
      <PastNavigator.Screen name="Past session" component={SessionScreen} />
    </PastNavigator.Navigator>
  );
}

export function SessionStack() {
  return (
    <SessionNavigator.Navigator
      headerMode="none"
      intialRouteName="Current Session"
    >
      <SessionNavigator.Screen name="Session" component={SessionScreen} />
      <SessionNavigator.Screen
        name="Drink Categories"
        component={DrinkCategoriesScreen}
      />
      <SessionNavigator.Screen name="Add Drink" component={AddDrinksScreen} />
      <SessionNavigator.Screen
        name="Session Bill"
        component={SessionBillScreen}
      />
      <SessionNavigator.Screen
        name="Add customer to session"
        component={AddCustomerSession}
      />
      <SessionNavigator.Screen
        name="New Session"
        component={NewSessionScreen}
      />
    </SessionNavigator.Navigator>
  );
}

// export function PaymentStack() {
//   return (
//     <PaymentNavigator.Navigator headerMode="none"></PaymentNavigator.Navigator>
//   );
// }

export function StockStack() {
  return (
    <StockNavigator.Navigator headerMode="none">
      <StockNavigator.Screen
        name="Stock Overview"
        component={StockOverviewScreen} />
        <StockNavigator.Screen
        name="Add Category"
        component={AddCategoryScreen} />
        <StockNavigator.Screen
        name="Add Product"
        component={AddProductStockScreen} />
         <StockNavigator.Screen
        name="Category Overview"
        component={CategoryOverviewScreen} />
    </StockNavigator.Navigator>
  );
}

export function AccountStack() {
  return (
    <AccountNavigator.Navigator headerMode="none">
      <AccountNavigator.Screen
        name="Account"
        component={AccountScreen}
        initialParams={{ context: AuthContext }}
      />
    </AccountNavigator.Navigator>
  );
}

export function SignInStack() {
  return (
    <SignInNavigator.Navigator headerMode="none">
      <AccountNavigator.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ context: AuthContext }}
      />
    </SignInNavigator.Navigator>
  );
}

export default function App() {
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
const theme = {
    colors: {
      primary: 'white',
  }
}

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

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let accessToken;
        try {
          accessToken = await api.login(data.email, data.password);
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
        api.signUp(data.email, data.password, data.name);
        let accessToken = await api
          .login(data.email, data.password)
          .catch((error) => alert(error));

        dispatch({ type: "SIGN_IN", token: accessToken });
      },
    }),
    [],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <DrawerNavigator.Navigator
          sceneContainerStyle={{ backgroundColor: "black" }}
          initialRouteName="Session"
          drawerStyle={styles.drawer}
          drawerContentOptions={{
            activeTintColor: colors.TEXT_PRIMARY,
            activeBackgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
            inactiveTintColor: colors.TEXT_PRIMARY,
            labelStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
          }}
        >
          {state.userToken !== null ? (
            <React.Fragment>
              <DrawerNavigator.Screen name="Session" component={SessionStack} />
              <DrawerNavigator.Screen name="Past" component={PastStack} />
              <DrawerNavigator.Screen
                name="Customers"
                component={CustomersStack}
              />
              {/* <DrawerNavigator.Screen
                name="Payments"
                component={PaymentStack}
              /> */}
              <DrawerNavigator.Screen name="Stock" component={StockStack} />
              <DrawerNavigator.Screen name="Account" component={AccountStack} />
            </React.Fragment>
          ) : (
            <DrawerNavigator.Screen name="Sign In" component={SignInStack} />
          )}
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    width: 240,
  },
  drawerItem: {},
});
