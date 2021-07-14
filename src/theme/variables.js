export const darkTheme = {
  mode: "dark",
  BRAND: "#FF9900",
  BACKGROUND_PRIMARY: "#000",
  BACKGROUND_SECONDARY: "#212121",
  BACKGROUND_BOTTOM_BAR: "#212121",
  BACKGROUND_LIGHT: "#fff",
  BACKGROUND_TERTIARY: "#fff",
  BACKGROUND_QUADRARY: "#474747",
  BACKGROUND_WARNING: "#ad0909",
  BACKGROUND_BUTTON_PRIMARY: "#fff",
  BACKGROUND_BUTTON_SECONDARY: "#000",
  BACKGROUND_BUTTON_BIG: "#FFF",
  BACKGROUND_IMAGE: "#fff",
  BACKGROUND_INPUT: "#000",
  BACKGROUND_PICKER: "#212121",
  BACKGROUND_IMAGE_LIGHT: "#fff",
  BACKGROUND_IMAGE_DARK: "#000",
  BACKGROUND_IMAGE_CONTRAST: "#000",
  BACKROUND_DRAWER: "#212121",
  BACKGROUND_SLIDE_SHEET: "#212121",
  BACKGROUND_LOW_CONTRAST: "#212121",
  BACKGROUND_HEADER: "#212121",
  BACKGROUND_STACK_HEADER: "#212121",
  BACKGROUND_OVERLAY: "#212121",
  BACKGROUND_LOADING_INDICATOR: "#212121",
  LINE_DARKMODE: "#fff",
  LINE_LIGHTMODE: "rgba(0,0,0,0)",
  LINE_LOW_CONTRAST: "#323232",
  LINE_PRIMARY: "#fff",
  LINE_CONTRAST: "#212121",
  TEXT_PRIMARY: "#fff",
  TEXT_SECONDARY: "#FFF",
  TEXT_TERTIARY: "#484848",
  TEXT_LOW_CONTRAST: "#484848",
  TEXT_HINT: "#C5C5C5",
  TEXT_CONTRAST: "#000",
  TEXT_DARK: "#000",
  TEXT_BUTTON_PRIMARY: "#000",
  TEXT_BUTTON_SECONDARY: "#fff",
  TEXT_BUTTON_WARNING: "#fff",
  STATUSBAR_TEXT: "#fff",
  STATUSBAR_BACKGROUND: "#212121",
  LOADING_INDICATOR: "#484848",

  FONT_MEDIUM: "Gotham-Medium",
  FONT_THIN: "Gotham-Book",
};

export const lightTheme = {
  mode: "light",
  BRAND: "#FF9900",
  BACKGROUND_BOTTOM_BAR: "#fff",
  BACKGROUND_PRIMARY: "#fff",
  BACKGROUND_SECONDARY: "#212121",
  BACKGROUND_TERTIARY: "#CECECE",
  BACKGROUND_QUADRARY: "#EEEEEE",
  BACKGROUND_LIGHT: "#fff",
  BACKGROUND_PICKER: "#CECECE",
  BACKGROUND_INPUT: "#CECECE",
  BACKGROUND_WARNING: "#ad0909",
  BACKGROUND_BUTTON_PRIMARY: "#FF9900",
  BACKGROUND_BUTTON_SECONDARY: "#fff",
  BACKGROUND_BUTTON_BIG: "#CECECE",
  BACKGROUND_OVERLAY: "#fff",
  BACKGROUND_IMAGE: "#000",
  BACKGROUND_IMAGE_LIGHT: "#fff",
  BACKGROUND_IMAGE_DARK: "#000",
  BACKGROUND_IMAGE_CONTRAST: "#fff",
  BACKROUND_DRAWER: "#fff",
  BACKGROUND_SLIDE_SHEET: "#FF9900",
  BACKGROUND_LOW_CONTRAST: "#CECECE",
  BACKGROUND_HEADER: "#fff",
  BACKGROUND_STACK_HEADER: "#fff",
  BACKGROUND_LOADING_INDICATOR: "#CECECE",
  LINE_PRIMARY: "#fff",
  LINE_LOW_CONTRAST: "#CECECE",
  LINE_CONTRAST: "#000",
  TEXT_PRIMARY: "#000",
  TEXT_SECONDARY: "#FFF",
  TEXT_TERTIARY: "#CECECE",
  LINE_DARKMODE: "rgba(0,0,0,0)",
  LINE_LIGHTMODE: "#FF9900",
  TEXT_HINT: "#484848",
  TEXT_DARK: "#000",
  TEXT_CONTRAST: "#fff",
  TEXT_LOW_CONTRAST: "#CECECE",
  TEXT_BUTTON_PRIMARY: "#fff",
  TEXT_BUTTON_SECONDARY: "#000",
  TEXT_BUTTON_WARNING: "#fff",
  STATUSBAR_TEXT: "#fff",
  STATUSBAR_BACKGROUND: "#fff",
  LOADING_INDICATOR: "#FF9900",

  FONT_MEDIUM: "Gotham-Medium",
  FONT_THIN: "Gotham-Book",
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

  DRINKS_CATEGORIES: [
    { id: 1, name: "Soft drinks" },
    { id: 2, name: "Beer" },
    { id: 3, name: "Wines" },
    { id: 4, name: "Mixes" },
  ],

  DRINKS_BEER: {
    title: "Beers",
    drinks: [
      { id: 1, name: "Heiniken vaasje", price: 1.25 },
      { id: 2, name: "Heiniken fluitje", price: 1.0 },
      { id: 3, name: "la Chouffe", price: 2.5 },
      { id: 4, name: "Hertog Jan flesje", price: 1.2 },
    ],
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
