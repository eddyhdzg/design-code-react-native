import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Section: undefined;
  Courses: undefined;
  Projects: undefined;
};

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type SectionScreenRouteProp = RouteProp<RootStackParamList, "Section">;

export type SectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Section"
>;
export type CoursesScreenRouteProp = RouteProp<RootStackParamList, "Courses">;

export type CoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Courses"
>;
export type ProjectsScreenRouteProp = RouteProp<RootStackParamList, "Projects">;

export type ProjectsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Projects"
>;

export type section = {
  title: string;
  image: ImageSourcePropType;
  subtitle: string;
  caption: string;
  logo: ImageSourcePropType;
  content?: any;
};

export type cardsCollection = {
  items: section[];
};
