import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import BarTapDrawer, { DrawerIcon } from "../../component/BarTapDrawer";
import AccountScreen from "../../screen/account/AccountScreen";
import CreateBarScreen from "../../screen/account/CreateBarScreen";
import AddCustomerScreen from "../../screen/customer/AddCustomerScreen";
import CustomerOverviewScreen from "../../screen/customer/CustomerOverviewScreen";
import CustomersScreen from "../../screen/customer/CustomersScreen";
import EditCustomerScreen from "../../screen/customer/EditCustomerScreen";
import AddDrinksScreen from "../../screen/drinks/AddDrinkScreen";
import DrinkCategoriesScreen from "../../screen/drinks/DrinkCategoriesScreen";
import AddCustomerSession from "../../screen/session/AddCustomerSession";
import CurrentBillScreen from "../../screen/session/CurrentBillScreen";
import NewSessionScreen from "../../screen/session/NewSessionScreen";
import OrderHistorySessionScreen from "../../screen/session/OrderHistorySession";
import PastSessionBillsScreen from "../../screen/session/PastSessionBillsScreen";
import PastSessionsScreen from "../../screen/session/PastSessionsScreen";
import SessionBillScreen from "../../screen/session/SessionBillScreen";
import SessionScreen from "../../screen/session/SessionScreen";
import AddCategoryScreen from "../../screen/stock/AddCategoryScreen";
import AddProductStockScreen from "../../screen/stock/AddProductStockScreen";
import CategoryOverviewScreen from "../../screen/stock/CategoryOverviewScreen";
import EditCategoryScreen from "../../screen/stock/EditCategoryScreen";
import EditProductScreen from "../../screen/stock/EditProductScreen";
import StockOverviewScreen from "../../screen/stock/StockOverviewScreen";
import { AuthContext } from "../../service/Context.js";

const DrawerNavigator = createDrawerNavigator();
const CustomersNavigator = createStackNavigator();
const PastNavigator = createStackNavigator();
const SessionNavigator = createStackNavigator();
const StockNavigator = createStackNavigator();
const AccountNavigator = createStackNavigator();

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
        name="Edit customer"
        component={EditCustomerScreen}
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
        component={CurrentBillScreen}
      />
      <SessionNavigator.Screen
        name="Add customer to session"
        component={AddCustomerSession}
      />
      <SessionNavigator.Screen
        name="New Session"
        component={NewSessionScreen}
      />
      <SessionNavigator.Screen
        name="Order History"
        component={OrderHistorySessionScreen}
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

export default function AdministratorPath({ state }) {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        overlayColor="transparent"
        drawerType="slide"
        drawerContent={(props) => <BarTapDrawer {...props} />}
      >
        <DrawerNavigator.Screen
          name="Session"
          component={SessionStack}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/session-icon.png")} />
            ),
          }}
        />
        <DrawerNavigator.Screen
          name="History"
          component={PastStack}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/history-icon.png")} />
            ),
          }}
        />
        <DrawerNavigator.Screen
          name="Customers"
          component={CustomersStack}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/customers-icon.png")} />
            ),
          }}
        />
        <DrawerNavigator.Screen
          name="Stock"
          component={StockStack}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/stock-icon.png")} />
            ),
          }}
        />
        <DrawerNavigator.Screen
          name="Preferences"
          component={AccountStack}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/settings-icon.png")} />
            ),
          }}
        />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}
