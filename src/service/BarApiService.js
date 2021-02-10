export function addDrink(customer, drink) {
  console.log("Adding drink: " + drink.name + " to " + customer.name);
}

export function getDrinksByCategory(category) {
  return {
    title: "Beers",
    drinks: [
      { id: 1, name: "Heiniken vaasje", price: 1.25 },
      { id: 2, name: "Heiniken fluitje", price: 1.0 },
      { id: 3, name: "la Chouffe", price: 2.5 },
      { id: 4, name: "Hertog Jan flesje", price: 1.2 },
    ],
  };
}

export function getCurrentSession() {
  return {
    id: 1,
    name: "Oudjaarsavond",
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
        timestamp: "2021-02-10T22:29:45.846+00:00",
        totalPrice: 19.38,
        orderlines: [
          {
            product: {
              id: 1,
              name: "Heiniken vaasje",
              price: 1.25,
            },
            amount: 4,
          },
          {
            product: {
              id: 3,
              name: "la Chouffe",
              price: 2.5,
            },
            amount: 1,
          },
          {
            product: {
              id: 4,
              name: "Hertog Jan Flesje",
              price: 1.25,
            },
            amount: 8,
          },
        ],
      },
      {
        id: 2,
        timestamp: "2021-02-10T23:33:11.846+00:00",
        totalPrice: 12.50,
        orderlines: [
          {
            product: {
              id: 1,
              name: "Heiniken vaasje",
              price: 1.25,
            },
            amount: 5,
          },
          {
            product: {
              id: 3,
              name: "la Chouffe",
              price: 2.5,
            },
            amount: 2,
          },
          {
            product: {
              id: 4,
              name: "Hertog Jan Flesje",
              price: 1.25,
            },
            amount: 1,
          },
        ],
      },
    ],
  };
}
