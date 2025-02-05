import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "set-username") {
    return {
      ...state,
      username: action.name,
      loggedIn: action.loggedIn,
      sessionId: action.sessionId
    };
  }
  if (action.type === "add-cart") {
    if (action.data.stock > 0) {
      action.data.stock = action.data.stock - 1;

      return {
        ...state,
        products: [...state.products, action.data],
        cartItems: state.cartItems
          ? [...state.cartItems, action.data]
          : [action.data]
      };
    } else {
      return state;
    }
  }
  if (action.type === "signin") {
    return { ...state, username: action.username };
  }
  if (action.type === "set-products") {
    return { ...state, products: action.products };
  }
  if (action.type === "set-cartItems") {
    return { ...state, cartItems: action.cartItems };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "set-searchResults") {
    return { ...state, searchResults: action.searchResults };
  }
  if (action.type === "logout") {
    return { ...state, username: "", sessionId: "" };
  }
  if (action.type === "set-seller") {
    return { ...state, seller: action.seller };
  }

  return state;
};

let store = createStore(
  reducer,
  {
    searchQuery: "",
    username: "",
    loggedIn: false,
    searchResults: [],
    products: [],
    cartItems: [],
    sessionId: "",
    messages: [],
    seller: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
