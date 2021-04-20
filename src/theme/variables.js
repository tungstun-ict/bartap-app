export const colors = {
  BARTAP_BLACK: "#000",
  BARTAP_DARK_GREY: "#212121",
  BARTAP_SELECTED: "#323232",

  BARTAP_RED: "#ad0909",

  BARTAP_WHITE: "#fff",
  BARTAP_LIGHT_GREY: "#484848",
  BARTAP_GREY: "#383838",
};

export const sizes = {
  TITLE: 30,
};

//TODO: Connect to API
export const mock = {
  ORGANISATION_NAME: "Bartap",
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

  DRINKS_CATEGORIES: [
    { id: 1, name: "Soft drinks"},
    { id: 2, name: "Beer"},
    { id: 3, name: "Wines"},
    { id: 4, name: "Mixes"},
  ],

  DRINKS_BEER: {
    title: "Beers",
    drinks: [
      { id: 1, name: "Heiniken vaasje", price: 1.25},
      { id: 2, name: "Heiniken fluitje", price: 1.00},
      { id: 3, name: "la Chouffe", price: 2.50},
      { id: 4, name: "Hertog Jan flesje", price: 1.20},
    ]
  },
  
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
