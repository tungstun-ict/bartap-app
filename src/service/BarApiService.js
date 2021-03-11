import { useState } from "react";
import { Alert } from "react-native";
import * as storage from "../service/BarStorageService.js";
import AuthContext from "../service/Context.js";
const api_url = "https://tungstun-bar-api.herokuapp.com/api";

async function getRequest(url) {
  const accessToken = await storage.getaccessToken();
  console.log("Doing a getRequest on URL: " + url);
  return fetch(api_url + url, {

    method: "GET",
    headers: {
      "authorization": accessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response;
    if(response.status === 401) {
      refreshTokens();
      console.log("Retrying:")
      return getRequest(url);
    }
    else throw "Could not make request";
  });
}
export async function refreshTokens() {
  const accessToken = await storage.getaccessToken();
  const refreshToken = await storage.getRefreshToken();

  let tokens = null;
  tokens = await fetch(api_url + "/authenticate/refresh", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "token_type": "bearer",
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    }
  }).then(response => {
    if(response.ok) {

    } else {
      const { signOut } = useContext(AuthContext);
      signOut();
    }
  })

  
}


export async function login(email, password) {
  console.log("logging in...")
  let data = { username: email, password: password };
  let tokens = null;
  tokens = await fetch(api_url + "/authenticate", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return {
          "accessToken": response.headers.get("access_token"), 
          "refreshToken": response.headers.get("refresh_token")
        };
      }
    }).catch((error) => {
      throw error;

    })

    await storage.storeaccessToken(tokens.accessToken);
    await storage.storeRefreshToken(tokens.refreshToken);
}

export async function logout() {
  await storage.removeaccessToken()
  console.log('Logged out.')
}

export function addDrink(customer, drink) {
  console.log("Adding drink: " + drink.name + " to " + customer.name);
}

export async function getDrinksByCategory(category) {
  return await getRequest("/bars/1/products?categoryId=" + category.id)
}

export function createCustomer(name, phone) {
  console.log("Creating customer: " + name + phone);
  return 200;
}

export async function getBars() {
  console.log(await getRequest("/bars"));
}

export async function getCurrentSession() {
  return await getRequest("/bars/1/sessions/active")
}

export async function getCategories() {
  return await getRequest("/bars/1/categories");
}

export function getSessionById(sessionId) {
  return {
    id: sessionId,
    name: "Een vorige sessie",
    customers: [
      {
        id: 1,
        name: "Jort",
        currentBill: {
          total: 21.5,
        },
      },
      {
        id: 3,
        name: "Jona",
        currentBill: {
          total: 26.5,
        },
      },
      {
        id: 5,
        name: "Fee",
        currentBill: {
          total: 7.49,
        },
      },
      {
        id: 6,
        name: "Dante",
        currentBill: {
          total: 2.1,
        },
      },
      {
        id: 7,
        name: "Sep",
        currentBill: {
          total: 2.1,
        },
      },
    ],
  };
}

export function getCustomerById(id) {
  return {
    name: "customer " + id,
    id: id,
  };
}

export function getBillBySessionIdAndCustomerId(sessionId, customerId) {
  return {
    customerId: customerId,
    sessionId: sessionId,
    totalPrice: 31.88,
    orders: [
      {
        id: 1,
        timestamp: "2021-02-10T21:29:45.846+00:00",
        totalPrice: 5.0,
        product: {
          id: 1,
          name: "Heiniken vaasje",
          price: 1.25,
        },
        amount: 4,
      },
      {
        id: 2,
        timestamp: "2021-02-10T22:21:45.846+00:00",
        totalPrice: 2.0,
        product: {
          id: 1,
          name: "Hertog Jan Flesje",
          price: 1.0,
        },
        amount: 2,
      },
      {
        id: 3,
        timestamp: "2021-02-10T19:18:45.846+00:00",
        totalPrice: 2.5,
        product: {
          id: 1,
          name: "Heiniken vaasje",
          price: 1.25,
        },
        amount: 2,
      },
    ],
  };
}

export function getAllSessions() {
  return [
    {
      id: 2,
      name: "Avond met Sep",
      timestamp: "2020-12-21T21:29:45.846+00:00",
    },
    {
      id: 1,
      name: "Eerste kerstdag",
      timestamp: "2020-12-25T21:29:45.846+00:00",
    },

    {
      id: 3,
      name: "Avond met Feestcommisie",
      timestamp: "2020-11-12T21:29:45.846+00:00",
    },
    {
      id: 4,
      name: "Avond met Sep",
      timestamp: "2020-10-26T21:29:45.846+00:00",
    },
  ];
}

export function lockSession(sessionId) {
  console.log("locked session " + sessionId);
}
