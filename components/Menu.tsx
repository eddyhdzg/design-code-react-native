import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { items } from "../utils/constants";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const mapStateToProps = (state: any) => {
  return {
    action: state.action,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU",
      }),
  };
};

interface Menu {
  action: "openMenu" | "closeMenu";
  closeMenu: () => void;
}

const Menu: React.FC<Menu> = ({ action, closeMenu }) => {
  const [top, setTop] = useState(new Animated.Value(screenHeight));
  const [width, setWidth] = useState(screenWidth);

  const handleResize = () => {
    if (screenWidth < 1000) {
      setWidth(screenWidth);
    } else {
      setWidth(screenWidth / 2);
    }
  };

  useEffect(() => {
    toggleMenu();
    Dimensions.addEventListener("change", handleResize);
    return () => {
      Dimensions.removeEventListener("change", handleResize);
    };
  }, [action]);

  const toggleMenu = () => {
    if (action === "openMenu") {
      Animated.spring(top, {
        toValue: 64,
        useNativeDriver: false,
      }).start();
    } else if (action === "closeMenu") {
      Animated.spring(top, {
        useNativeDriver: false,
        toValue: screenHeight,
      }).start();
    }
  };

  return (
    <AnimatedContainer style={{ top, width }}>
      <Cover>
        <Image source={require("../assets/background2.jpg")} />
        <Title>Eddy</Title>
        <Subtitle>Designer at Design+Code</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={closeMenu}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView>
          <Ionicons name="md-close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map(({ title, icon, text }) => (
          <MenuItem key={title} icon={icon} text={text} title={title} />
        ))}
      </Content>
    </AnimatedContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight}px;
  background: #f0f3f5;
  padding: 50px;
`;
