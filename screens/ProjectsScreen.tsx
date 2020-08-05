import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import {
  ProjectsScreenNavigationProp,
  ProjectsScreenRouteProp,
} from "../utils/types/index.types";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

interface IProjectsScreen {
  navigation: ProjectsScreenNavigationProp;
  route: ProjectsScreenRouteProp;
  header: any;
}

const ProjectsScreen: React.FC<IProjectsScreen> = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: () => {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
      }),
    []
  );
  return (
    <Container>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Project
          title="Price Tag"
          image={require("../assets/background5.jpg")}
          author="Liu Yi"
          text="Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
        />
      </Animated.View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f3f5;
`;
const Text = styled.Text``;

export default ProjectsScreen;
