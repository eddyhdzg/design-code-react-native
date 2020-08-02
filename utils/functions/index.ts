import { Route } from "@react-navigation/native";

export function getHeaderTitle({ name }: Partial<Route<string>>) {
  switch (name) {
    case "Home":
      return "News feed";
    case "Section":
      return "My profile";
    default:
      return "Error";
  }
}
