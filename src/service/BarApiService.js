import * as storage from "../service/BarStorageService.js";
import axios from "axios";
const api_url = "https://tungstun-bar-api.herokuapp.com/api";

const api = axios.create({
  baseURL: "https://tungstun-bar-api.herokuapp.com/api",
});

api.defaults.headers.common["token_type"] = "bearer";
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";

api.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("INTERCEPT STATUS: " + JSON.stringify(error.message));
    let refreshToken = await storage.getRefreshToken();
    let accessToken = await storage.getAccessToken();
    if (
      refreshToken &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return api
        .post("/authenticate/refresh", {
          refreshToken: refreshToken,
          accessToken: accessToken,
        })
        .then(async (res) => {
          if (res.status === 200) {
            await storage.storeAccessToken(res.headers.access_token);
            console.log(
              "Access token refreshed! : " + res.headers.access_token,
            );
            let headers = originalRequest.headers;
            headers.access_token = res.headers.access_token;
            originalRequest.headers = headers;
            return api(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  },
);

async function getRequest(url) {
  const accessToken = await storage.getAccessToken();
  console.log("Doing a getRequest on URL: " + url);

  return api
    .get(url, { headers: { access_token: accessToken } })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function login(email, password) {
  console.log("logging in...");
  let data = { userIdentification: email, password: password };
  let tokens = null;
  tokens = await fetch(api_url + "/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Credentials ok: Storing now");
        if (response.headers.get("access_token"))
          return {
            accessToken: response.headers.get("access_token"),
            refreshToken: response.headers.get("refresh_token"),
          };
      } else {
        throw "Credentials not ok";
      }
    })
    .catch((error) => {
      throw error;
    });
  await storage.storeAccessToken(tokens.accessToken);
  await storage.storeRefreshToken(tokens.refreshToken);
}

export async function logout() {
  await storage.removeAccessToken();
  await storage.removeRefreshToken();
  console.log("Logged out.");
}

export async function createSession(name) {
  await api.post(`/bars/${await storage.getActiveBar()}/sessions`, {
    name: name,
  });
}

export async function deleteCustomer(customerId) {
  await api.delete(
    `/bars/${await storage.getActiveBar()}/people/${customerId}`,
  );
}

export async function addDrink(billId, drinkId, sessionId) {
  await api.put(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/bills/${billId}`,
    {
      amount: 1,
      bartenderId: 1,
      productId: drinkId,
    },
  );
}

export async function createProduct(
  name,
  brand,
  selectedCategory,
  isFavourite,
  sellingPrice,
  productType,
  size,
) {
  return await api.post(`/bars/${await storage.getActiveBar()}/products`, {
    brand: brand,
    categoryId: selectedCategory,
    isFavorite: isFavourite,
    name: name,
    price: sellingPrice,
    productType: productType,
    size: size,
  });
}

export async function addCustomerToSession(sessionId, customerId) {
  console.log(sessionId + " " + customerId);
  await api.post(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/`,
    {
      customerId: customerId,
    },
  );
}

export async function deleteOrderFromBill(sessionId, billId, itemId) {
  return await api.delete(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/bills/${billId}/orders/${itemId}`,
  );
}

export async function deleteBill(sessionId, billId) {
  return await api.delete(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/bills/${billId}`,
  );
}

export async function getDrinksByCategory(categoryId) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/products?categoryId=${categoryId}`,
  );
}

export async function getAllProductsByBar() {
  return await getRequest(`/bars/${await storage.getActiveBar()}/products`);
}

export async function createCustomer(name, phone) {
  return await api
    .post(`/bars/${await storage.getActiveBar()}/people`, {
      name: name,
      phoneNumber: phone,
    })
    .then((response) => {
      return response.data;
    });
}
export async function getBillsByCustomerId(id) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/people/${id}/bills`,
  );
}

export async function getBars() {
  return await getRequest(`/bars`);
}

export async function getBillByBillIdAndSessionId(billId, sessionId) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/bills/${billId}`,
  );
}

export async function getCurrentSession() {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/sessions/active`,
  );
}

export async function getAllCustomersByBarId() {
  return await getRequest(`/bars/${await storage.getActiveBar()}/people`);
}

export async function getCategories() {
  return await getRequest(`/bars/${await storage.getActiveBar()}/categories`);
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

export async function getCustomerById(id) {
  return await getRequest(`/bars/${await storage.getActiveBar()}/people/${id}`);
}

export async function lockSession(sessionId) {
  return await api.patch(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/lock`,
  );
}

export async function getAllSessions() {
  return await getRequest(`/bars/${await storage.getActiveBar()}/sessions`)
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
