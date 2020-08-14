import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  ProjectsScreenNavigationProp,
  ProjectsScreenRouteProp,
} from "../utils/types/index.types";
import Project from "../components/project/Project";
import { PanResponder, Animated } from "react-native";
import { projects } from "../utils/constants";
import { connect } from "react-redux";

interface IProjectsScreen {
  navigation: ProjectsScreenNavigationProp;
  route: ProjectsScreenRouteProp;
  header: any;
  action: any;
}

const handleNextIndex = (i: number): number => {
  const nextIndex = i + 1;
  return nextIndex > projects.length - 1 ? 0 : nextIndex;
};

const mapStateToProps = (state: any) => {
  return {
    action: state.action,
  };
};

const ProjectsScreen: React.FC<IProjectsScreen> = ({ action }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [scale] = useState(new Animated.Value(0.9));
  const [translateY] = useState(new Animated.Value(44));
  const [scale2] = useState(new Animated.Value(0.8));
  const [translateY2] = useState(new Animated.Value(-50));
  const [index, setIndex] = useState<number>(0);
  const [opacity] = useState(new Animated.Value(0));

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          if (gestureState.dx === 0 && gestureState.dy === 0) {
            return false;
          } else if (action === "openCard") {
            return false;
          }
          return true;
        },

        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),

        onPanResponderGrant: () => {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          Animated.spring(scale2, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY2, {
            toValue: 44,
            useNativeDriver: false,
          }).start();

          Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        },

        onPanResponderRelease: () => {
          // @ts-ignore
          const positionY = pan.y._value;
          Animated.timing(opacity, {
            toValue: 0,
            useNativeDriver: false,
          }).start();

          if (positionY > 200) {
            Animated.timing(pan, {
              // @ts-ignore
              toValue: { x: 0, y: 1000 },
              useNativeDriver: false,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              scale.setValue(0.9);
              translateY.setValue(44);
              scale2.setValue(0.8);
              translateY2.setValue(-50);

              setIndex(handleNextIndex(index));
            });
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
            Animated.spring(scale2, {
              toValue: 0.8,
              useNativeDriver: false,
            }).start();
            Animated.spring(translateY2, {
              toValue: -50,
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [index, action]
  );

  return (
    <Container>
      <AnimatedMask style={{ opacity }} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Project {...projects[index]} canOpen />
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
        <Project {...projects[handleNextIndex(index)]} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale2 }, { translateY: translateY2 }],
        }}
      >
        <Project {...projects[handleNextIndex(index + 1)]} />
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

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

export default connect(mapStateToProps)(ProjectsScreen);
