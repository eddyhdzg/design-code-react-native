import React, { useState } from "react";
import { StyledComponent, DefaultTheme } from "styled-components";
import {
  AnimatedContainer,
  Cover,
  AnimatedTitle,
  Author,
  Image,
  AnimatedText,
  AnimatedCloseView,
  AnimatedLinearGradient,
} from "./blocks";
import {
  ImageSourcePropType,
  Animated,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    action: state.action,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD",
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD",
      }),
  };
};

interface Project {
  author: string;
  image: ImageSourcePropType;
  text: string;
  title: string;
  canOpen?: boolean;
  openCard: () => void;
  closeCard: () => void;
}

interface ProjectSubComponents {
  AnimatedContainer: Animated.AnimatedComponent<
    StyledComponent<typeof View, DefaultTheme>
  >;
  Cover: StyledComponent<typeof View, DefaultTheme>;
  Image: StyledComponent<typeof Image, DefaultTheme>;
  AnimatedTitle: Animated.AnimatedComponent<
    StyledComponent<typeof Text, DefaultTheme>
  >;
  Author: StyledComponent<typeof Text, DefaultTheme>;
  AnimatedText: Animated.AnimatedComponent<
    StyledComponent<typeof Text, DefaultTheme>
  >;
  AnimatedCloseView: Animated.AnimatedComponent<
    StyledComponent<typeof View, DefaultTheme>
  >;
  AnimatedLinearGradient: Animated.AnimatedComponent<typeof LinearGradient>;
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 78;

const Project: React.FC<Project> & ProjectSubComponents = ({
  author,
  image,
  text,
  title,
  canOpen,
  openCard,
  closeCard,
}) => {
  const [width] = useState(new Animated.Value(315));
  const [height] = useState(new Animated.Value(460));
  const [titleTop] = useState(new Animated.Value(20));
  const [opacity] = useState(new Animated.Value(0));
  const [textHeight] = useState(new Animated.Value(100));

  const handleOpenCard = () => {
    if (!canOpen) return;
    Animated.spring(width, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();

    Animated.spring(titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
    openCard();
  };

  const handleCloseCard = () => {
    Animated.spring(width, {
      toValue: 315,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: 460,
      useNativeDriver: false,
    }).start();

    Animated.spring(titleTop, {
      toValue: 20,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();

    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
    closeCard();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOpenCard}>
      <Project.AnimatedContainer style={{ width, height }}>
        <Project.Cover>
          <Project.Image source={image} />
          <Project.AnimatedTitle style={{ top: titleTop }}>
            {title}
          </Project.AnimatedTitle>
          <Project.Author>by {author}</Project.Author>
        </Project.Cover>
        <Project.AnimatedText style={{ height: textHeight }}>
          {text}
        </Project.AnimatedText>
        <AnimatedLinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            height: textHeight,
          }}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 30 }}
          onPress={handleCloseCard}
        >
          <Project.AnimatedCloseView style={{ opacity }}>
            <Ionicons name="md-close" size={32} color="#546bfb" />
          </Project.AnimatedCloseView>
        </TouchableOpacity>
      </Project.AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

Project.AnimatedContainer = AnimatedContainer;
Project.Cover = Cover;
Project.Image = Image;
Project.AnimatedTitle = AnimatedTitle;
Project.Author = Author;
Project.AnimatedText = AnimatedText;
Project.AnimatedCloseView = AnimatedCloseView;
Project.AnimatedLinearGradient = AnimatedLinearGradient;
