import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { section } from "../utils/types/index.types";
import { useCards } from "../utils/graphql/hooks";
import { courses, logos } from "../utils/constants";

const mapStateToProps = (state: any) => {
  return {
    action: state.action,
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
};

interface HomeScreen {
  action: "openMenu" | "closeMenu";
  name: string;
  openMenu: () => void;
  navigation: StackNavigationProp;
}

const HomeScreen: React.FC<HomeScreen> = ({
  action,
  name,
  openMenu,
  navigation,
}) => {
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));
  const { loading, error, data } = useCards();

  useEffect(() => {
    toggleMenu();
  }, [action]);

  const toggleMenu = () => {
    if (action === "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        // @ts-ignore
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    } else if (action === "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        // @ts-ignore
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu />
      <AnimatedContainer style={{ transform: [{ scale }], opacity }}>
        <SafeAreaView>
          <VScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={openMenu}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{name}</Name>

              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {logos.map(({ image, text }, index) => (
                <Logo key={index} image={image} text={text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <HScrollView horizontal showsHorizontalScrollIndicator={false}>
              {loading ? (
                <Loading>Loading...</Loading>
              ) : (
                data?.cardsCollection.items.map(
                  (card: section, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.push("Section", {
                          section: card,
                        })
                      }
                    >
                      <Card {...card} />
                    </TouchableOpacity>
                  )
                )
              )}
            </HScrollView>
            <Subtitle>Popular Courses</Subtitle>
            <HScrollView horizontal showsHorizontalScrollIndicator={false}>
              {courses.map((course, index) => (
                <Course key={index} {...course} />
              ))}
            </HScrollView>
          </VScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const VScrollView = styled.ScrollView`
  height: 100%;
`;

const HScrollView = styled.ScrollView`
  padding-bottom: 30px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const RootView = styled.View`
  flex: 1;
  background: black;
`;

const Loading = styled.Text``;
