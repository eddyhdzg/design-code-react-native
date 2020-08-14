import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const SPACE = process.env.EXPO_SPACE;
const TOKEN = process.env.EXPO_ACCESS_TOKEN;
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

const client = new ApolloClient({
  uri: CONTENTFUL_URL,
  headers: {
    authorization: `Bearer ${TOKEN}`,
  },
  cache: new InMemoryCache(),
});

const initialState = {
  action: "",
  name: "Stranger",
  avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "UPDATE_NAME": {
      return { ...state, name: action.name };
    }
    case "OPEN_CARD":
      return { ...state, action: "openCard" };
    case "CLOSE_CARD": {
      return { ...state, action: "closeCard" };
    }
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.avatar };
    default:
      return state;
  }
};

// @ts-ignore
const store = createStore(reducer);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
