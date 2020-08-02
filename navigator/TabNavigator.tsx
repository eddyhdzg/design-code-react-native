import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator();

interface IHomeStackScreen {
  route: any;
  navigation: any;
}

function HomeStackScreen({ route, navigation }: IHomeStackScreen) {
  const tabBarVisible = route?.state?.index !== 1;
  navigation.setOptions({ tabBarVisible });

  return (
    <HomeStack.Navigator
      mode="card"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Section" component={SectionScreen} />
    </HomeStack.Navigator>
  );
}

const CoursesStack = createStackNavigator();

function CoursesStackScreen() {
  return (
    <CoursesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CoursesStack.Screen name="Courses" component={CoursesScreen} />
    </CoursesStack.Navigator>
  );
}

const ProjectsStack = createStackNavigator();

function ProjectsStackScreen() {
  return (
    <ProjectsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProjectsStack.Screen name="Projects" component={ProjectsScreen} />
    </ProjectsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-home"
                size={26}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Courses"
          component={CoursesStackScreen}
          options={{
            tabBarLabel: "Courses",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-albums"
                size={26}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsStackScreen}
          options={{
            tabBarLabel: "Projects",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-folder"
                size={26}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
