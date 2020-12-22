export const colors = {
  BACKGROUND: "#000",
  ELEMENT_BACKGROUND: "#212121",
  ELEMENT_BACKGROUND_SELECTED: "#323232",

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
  SESSION_NAME: "Oudjaarsavond",

  //TODO: Convert ID to key for every customer
  CUSTOMERS: [
    {
      key: 1,
      name: "Jort Willemsen",
    },
    {
      key: 2,
      name: "Mees Franchimont",
    },
    {
      key: 3,
      name: "Jona Leeflang",
    },
    {
      key: 4,
      name: "Sep de Geus",
    },
    {
      key: 5,
      name: "Fee Sanders",
    },
    {
      key: 6,
      name: "Dante Bloemendaal",
    },
  ],
};

export const data = {
  API_BASE_ADRESS: "http://localhost:8080/",
};
