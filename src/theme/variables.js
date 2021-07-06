export const darkTheme = {
  mode: 'dark',
  BRAND: "#FF9900",
  BACKGROUND_PRIMARY: "#000",
  BACKGROUND_SECONDARY: "#212121",
  BACKGROUND_TERTIARY: "#fff",
  BACKGROUND_QUADRARY: "#474747",
  BACKGROUND_WARNING: "#ad0909", 
  BACKGROUND_BUTTON_PRIMARY: "#fff",
  BACKGROUND_BUTTON_SECONDARY: "#000",
  BACKGROUND_IMAGE: "#fff",
  BACKGROUND_IMAGE_CONTRAST: "#000",
  TEXT_PRIMARY: "#fff",
  TEXT_HINT: "#C5C5C5",
  TEXT_CONTRAST: "#000",
  TEXT_BUTTON_PRIMARY: "#000",
};

export const lightTheme = {
  mode: 'light',
  BRAND: "#FF9900",
  BACKGROUND_PRIMARY: "#fff",
  BACKGROUND_SECONDARY: "#212121",
  BACKGROUND_TERTIARY: "#CECECE",
  BACKGROUND_QUADRARY: "#EEEEEE",
  BACKGROUND_WARNING: "#ad0909", 
  BACKGROUND_BUTTON_PRIMARY: "#FF9900",
  BACKGROUND_BUTTON_SECONDARY: "#fff",
  BACKGROUND_IMAGE: "#000",
  BACKGROUND_IMAGE_CONTRAST: "#fff",
  TEXT_PRIMARY: "#000",
  TEXT_HINT: "#C5C5C5",
  TEXT_CONTRAST: "#fff" ,
  TEXT_BUTTON_PRIMARY: "#fff",
  TEXT_BUTTON_SECONDARY: "#000", 
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
