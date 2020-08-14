import { AsyncStorage } from "react-native";

export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem("state", serializedState);
  } catch (error) {}
};
