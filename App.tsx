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
  name: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME": {
      return { name: action.name };
    }
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
