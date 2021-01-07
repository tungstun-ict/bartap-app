export const colors = {
  BACKGROUND: "#000",
  ELEMENT_BACKGROUND: "#212121",
  ELEMENT_BACKGROUND_SELECTED: "#323232",

  ELEMENT_BACKGROUND_LIGHT: "#ffffff",

  TEXT_PRIMARY: "#fff",
  TEXT_SECONDARY: "#484848",
  TEXT_TERTIARY: "#383838",
};

export const sizes = {
  TITLE: 30,
};

//TODO: Connect to API
export const mock = {
  ORGANISATION_NAME: "Bart's Bar",
  CURRENT_SESSION_NAME: "Oudjaarsavond",

  CURRENT_SESSION_CUSTOMERS: [
    {
      id: 1,
      name: "Jort",
      currentBill: {
        total: 21.50,
      }
    },
    {
      id: 3,
      name: "Jona",
      currentBill: {
        total: 26.50,
      }
    },
    {
      id: 5,
      name: "Fee",
      currentBill: {
        total: 7.49,
      }
    },
    {
      id: 6,
      name: "Dante",
      currentBill: {
        total: 2.10,
      }
    },
  ],

  //TODO: Convert ID to key for every customer
  CUSTOMERS: [
    {
      id: 1,
      name: "Jort Willemsen",
    },
    {
      id: 2,
      name: "Mees Franchimont",
    },
    {
      id: 3,
      name: "Jona Leeflang",
    },
    {
      id: 4,
      name: "Sep de Geus",
    },
    {
      id: 5,
      name: "Fee Sanders",
    },
    {
      id: 6,
      name: "Dante Bloemendaal",
    },
  ],
};

export const data = {
  API_BASE_ADRESS: "http://localhost:8080/",
};
