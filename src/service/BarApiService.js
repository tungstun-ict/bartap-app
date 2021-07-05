import axios from "axios";

import * as storage from "../service/BarStorageService.js";

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
}

export async function createSession(name) {
  await api.post(`/bars/${await storage.getActiveBar()}/sessions`, {
    name: name,
  });
}

export async function payBill(sessionId, billId) {
  await api.patch(`/bars/${await storage.getActiveBar()}/sessions/${sessionId}/bills/${billId}?isPayed=true`)
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
  size,
) {
  return await api.post(`/bars/${await storage.getActiveBar()}/products`, {
    brand: brand,
    categoryId: selectedCategory,
    isFavorite: isFavourite,
    name: name,
    price: sellingPrice,
    size: size,
  });
}

export async function addCustomerToSession(sessionId, customerId) {
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

export async function getProductById(productId) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/products/${productId}`,
  );
}

export async function updateCategory(categoryId, newName, newType) {
  return await api.put(
    `/bars/${await storage.getActiveBar()}/categories/${categoryId}`,
    {
      name: newName,
      type: newType,
    },
  );
}

export async function createCategory(name, type) {
  return await api.post(`/bars/${await storage.getActiveBar()}/categories`, {
    name: name,
    productType: type,
  });
}

export async function getCategoryById(categoryId) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/categories/${categoryId}`,
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

export async function getCustomerById(id) {
  return await getRequest(`/bars/${await storage.getActiveBar()}/people/${id}`);
}

export async function lockSession(sessionId) {
  return await api.patch(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}/lock`,
  );
}

export async function getAllSessions() {
  return await getRequest(`/bars/${await storage.getActiveBar()}/sessions`);
}

export async function getSessionById(sessionId) {
  return await getRequest(
    `/bars/${await storage.getActiveBar()}/sessions/${sessionId}`,
  );
}

export async function updateProduct(
  productId,
  name,
  brand,
  selectedCategoryId,
  isFavourite,
  sellingPrice,
  size,
) {
  return await api.put(
    `/bars/${await storage.getActiveBar()}/products/${productId}`,
    {
      brand: brand,
      categoryId: selectedCategoryId,
      isFavorite: isFavourite,
      name: name,
      price: sellingPrice,
      size: size,
    },
  );
}

export async function createBar(name, address, mail, phone) {
  return await api.post(`/bars`, {
    address: address,
    mail: mail,
    name: name,
    phoneNumber: phone,
  });
}
