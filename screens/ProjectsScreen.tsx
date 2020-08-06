import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  ProjectsScreenNavigationProp,
  ProjectsScreenRouteProp,
} from "../utils/types/index.types";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";
import { projects } from "../utils/constants";

interface IProjectsScreen {
  navigation: ProjectsScreenNavigationProp;
  route: ProjectsScreenRouteProp;
  header: any;
}

const ProjectsScreen: React.FC<IProjectsScreen> = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [scale] = useState(new Animated.Value(0.9));
  const [translateY] = useState(new Animated.Value(44));

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderRelease: () => {
          // @ts-ignore
          const positionY = pan.y._value;
          if (positionY > 200) {
            Animated.timing(pan, {
              // @ts-ignore
              toValue: { x: pan.x, y: 1000 },
              useNativeDriver: false,
            }).start();
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
            Animated.spring(scale, {
              toValue: 0.9,
              useNativeDriver: false,
            }).start();
            Animated.spring(translateY, {
              toValue: 44,
              useNativeDriver: false,
            }).start();
          }
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
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale }, { translateY }],
        }}
      >
        <Project {...projects[1]} />
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
