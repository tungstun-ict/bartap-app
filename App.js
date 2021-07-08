import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { Appearance } from "react-native";

import BarTapDrawer, { DrawerIcon } from "./src/component/BarTapDrawer";
import AccountScreen from "./src/screen/account/AccountScreen";
import CreateBarScreen from "./src/screen/account/CreateBarScreen";
import LoginScreen from "./src/screen/account/LoginScreen";
import AddCustomerScreen from "./src/screen/customer/AddCustomerScreen";
import CustomerOverviewScreen from "./src/screen/customer/CustomerOverviewScreen";
import CustomersScreen from "./src/screen/customer/CustomersScreen";
import AddDrinksScreen from "./src/screen/drinks/AddDrinkScreen";
import DrinkCategoriesScreen from "./src/screen/drinks/DrinkCategoriesScreen";
import AddCustomerSession from "./src/screen/session/AddCustomerSession";
import NewSessionScreen from "./src/screen/session/NewSessionScreen";
import PastSessionBillsScreen from "./src/screen/session/PastSessionBillsScreen";
import PastSessionsScreen from "./src/screen/session/PastSessionsScreen";
import SessionBillScreen from "./src/screen/session/SessionBillScreen";
import SessionScreen from "./src/screen/session/SessionScreen";
import SplashScreen from "./src/screen/SplashScreen";
import AddCategoryScreen from "./src/screen/stock/AddCategoryScreen";
import AddProductStockScreen from "./src/screen/stock/AddProductStockScreen";
import CategoryOverviewScreen from "./src/screen/stock/CategoryOverviewScreen";
import EditCategoryScreen from "./src/screen/stock/EditCategoryScreen";
import EditProductScreen from "./src/screen/stock/EditProductScreen";
import StockOverviewScreen from "./src/screen/stock/StockOverviewScreen";
import * as api from "./src/service/BarApiService.js";
import * as storage from "./src/service/BarStorageService.js";
import { AuthContext } from "./src/service/Context.js";
import { ThemeProvider } from "./src/theme/ThemeManager";

const DrawerNavigator = createDrawerNavigator();
const CustomersNavigator = createStackNavigator();
const PastNavigator = createStackNavigator();
const SessionNavigator = createStackNavigator();
const StockNavigator = createStackNavigator();
const AccountNavigator = createStackNavigator();
const SignInNavigator = createStackNavigator();

export function CustomersStack() {
  return (
    <CustomersNavigator.Navigator
      headerMode={"none"}
      initialRouteName={"AllCustomers"}
    >
      <CustomersNavigator.Screen
        name="All Customers"
        component={CustomersScreen}
      />
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
      <SessionNavigator.Screen
        name="Session Bills"
        component={PastSessionBillsScreen}
      />
      <SessionNavigator.Screen
        name="Past Session Bill"
        component={SessionBillScreen}
      />
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

export function StockStack() {
  return (
    <StockNavigator.Navigator headerMode="none">
      <StockNavigator.Screen
        name="Stock Overview"
        component={StockOverviewScreen}
      />
      <StockNavigator.Screen
        name="Add Category"
        component={AddCategoryScreen}
      />
      <StockNavigator.Screen
        name="Add Product"
        component={AddProductStockScreen}
      />
      <StockNavigator.Screen
        name="Category Overview"
        component={CategoryOverviewScreen}
      />
      <StockNavigator.Screen
        name="Edit Category"
        component={EditCategoryScreen}
      />
      <StockNavigator.Screen
        name="Edit Product"
        component={EditProductScreen}
      />
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
      <AccountNavigator.Screen
        name="Create Bar"
        component={CreateBarScreen}
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
    <>
      <ThemeProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <DrawerNavigator.Navigator
              drawerContent={(props) => <BarTapDrawer {...props} />}
            >
              {state.userToken !== null ? (
                <React.Fragment>
                  <DrawerNavigator.Screen
                    name="Session"
                    component={SessionStack}
                    options={{
                      drawerIcon: () => (
                        <DrawerIcon 
                          source={require("./src/assets/drawer/session-icon.png")} />
                      ),
                    }}
                  />
                  <DrawerNavigator.Screen 
                  name="History" 
                  component={PastStack}
                  options={{
                    drawerIcon: () => (
                      <DrawerIcon 
                          source={require("./src/assets/drawer/history-icon.png")} />
                    )
                  }} />
                  <DrawerNavigator.Screen
                    name="Customers"
                    component={CustomersStack}
                    options={{
                      drawerIcon: () => (
                        <DrawerIcon 
                          source={require("./src/assets/drawer/customers-icon.png")} />
                      )
                    }}
                  />
                  {/* <DrawerNavigator.Screen
                name="Payments"
                component={PaymentStack}
              /> */}
                  <DrawerNavigator.Screen 
                    name="Stock"
                    component={StockStack}
                    options={{
                      drawerIcon: () => (
                        <DrawerIcon 
                          source={require("./src/assets/drawer/stock-icon.png")} />
                      )
                    }} />
                  <DrawerNavigator.Screen
                    name="Account"
                    component={AccountStack}
                    options={{
                      drawerIcon: () => (
                        <DrawerIcon 
                          source={require("./src/assets/drawer/settings-icon.png")} />
                      )
                    }}
                  />
                </React.Fragment>
              ) : (
                <DrawerNavigator.Screen
                  name="Sign In"
                  component={SignInStack}
                />
              )}
            </DrawerNavigator.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
        <StatusBar style="light" />
      </ThemeProvider>
    </>
  );
}
