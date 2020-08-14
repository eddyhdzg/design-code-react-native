import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Dimensions, Animated } from "react-native";

let screenHeight = Dimensions.get("window").height;

interface Props {
  isActive: boolean;
}

const Success: React.FC<Props> = ({ isActive }) => {
  const animation = useRef(null);
  const [top] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();

      // @ts-ignore
      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

      // @ts-ignore
      animation.current.loop = false;
    }
  }, [isActive]);

  const onPress = () => {
    if (animation && animation.current) {
      // @ts-ignore
      animation.current.play();
    }
  };
  return (
    <AnimatedContainer style={{ top, opacity }}>
      <LottieView
        source={require("../assets/lottie-checked-done.json")}
        autoPlay
        loop={false}
        ref={animation}
      />
    </AnimatedContainer>
  );
};

export default Success;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
