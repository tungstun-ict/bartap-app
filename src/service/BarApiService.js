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
        id: id
    }
}
