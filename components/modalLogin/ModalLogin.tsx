import React, { useState, useEffect } from "react";
import { StyledComponent, DefaultTheme } from "styled-components";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
  AsyncStorage,
} from "react-native";
import {
  AnimatedContainer,
  Logo,
  Text,
  TextInput,
  ButtonView,
  ButtonText,
  IconEmail,
  IconPassword,
  AnimatedModal,
} from "./modalLogin.elements";
import { BlurView } from "expo-blur";
import Success from "../Success";
import Loading from "../Loading";
import { connect } from "react-redux";
import saveState from "../asyncStorage/AsyncStorage";
import firebase from "../Firebase";

interface ModalLoginSubComponents {
  AnimatedContainer: Animated.AnimatedComponent<
    StyledComponent<typeof View, DefaultTheme>
  >;
  AnimatedModal: Animated.AnimatedComponent<
    StyledComponent<typeof View, DefaultTheme>
  >;
  Logo: StyledComponent<typeof Image, DefaultTheme>;
  Text: StyledComponent<typeof Text, DefaultTheme>;
  TextInput: StyledComponent<typeof TextInput, DefaultTheme>;
  ButtonView: StyledComponent<typeof View, DefaultTheme>;
  ButtonText: StyledComponent<typeof Text, DefaultTheme>;
  IconEmail: StyledComponent<typeof Image, DefaultTheme>;
  IconPassword: StyledComponent<typeof Image, DefaultTheme>;
}

const emailImage = require("../../assets/icon-email.png");
const emailGif = require("../../assets/icon-email-animated.gif");
const passwordImage = require("../../assets/icon-password.png");
const passwordGif = require("../../assets/icon-password-animated.gif");
const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state: any) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch: any) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN",
      }),
    updateName: (name: string) =>
      dispatch({
        type: "UPDATE_NAME",
        name,
      }),
    updateAvatar: (avatar: string) =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar,
      }),
  };
}

interface Props {
  action: any;
  closeLogin: () => void;
  updateName: (name: string) => void;
  updateAvatar: (uri: string) => void;
}

const ModalLogin: React.FC<Props> & ModalLoginSubComponents = ({
  action,
  closeLogin,
  updateName,
}) => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test123");
  const [iconEmail, setIconEmail] = useState(emailImage);
  const [iconPassword, setIconPassword] = useState(passwordImage);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [top] = useState(new Animated.Value(screenHeight));
  const [scale] = useState(new Animated.Value(1.3));
  const [translateY] = useState(new Animated.Value(0));

  const handleLogin = () => {
    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        Alert.alert("Error", err.message);
      })
      .then((res) => {
        setIsLoading(false);

        if (res) {
          setTimeout(() => {
            setIsSuccessful(true);
            Alert.alert("Congrats", "You've logged in successfuly!");

            // console.log(res.user, res.user.);
            // storeName(res.user?.email);

            fetchUser();

            setTimeout(() => {
              closeLogin();
              setIsSuccessful(false);
            }, 1000);
          }, 2000);
        }
      });
  };
  const focusEmail = () => setIconEmail(emailGif);
  const blurEmail = () => setIconEmail(emailImage);
  const focusPassword = () => setIconPassword(passwordGif);
  const blurPassword = () => setIconPassword(passwordImage);
  const tapBackground = () => {
    Keyboard.dismiss();
    closeLogin();
  };

  const fetchUser = () => {
    fetch("https://uifaces.co/api?limit=1&random", {
      headers: new Headers({
        "X-API-KEY": "eeaafbe81657073cd70ac6e3de1bd6",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const name = response[0].name;
        const avatar = response[0].photo;
        saveState({ name, avatar });
        updateName(name);
        updateAvatar(avatar);
      });
  };

  useEffect(() => {
    retriveName();

    if (action == "openLogin") {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }

    if (action == "closeLogin") {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight,
          duration: 0,
          useNativeDriver: false,
        }).start();

        Animated.spring(scale, {
          toValue: 1.3,
          useNativeDriver: false,
        }).start();
      }, 500);

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [action]);

  const storeName = async (name?: string | null) => {
    try {
      if (name) {
        await AsyncStorage.setItem("name", name);
      }
    } catch (error) {}
  };

  const retriveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        updateName(name);
      }
    } catch (error) {}
  };

  return (
    <ModalLogin.AnimatedContainer style={{ top }}>
      <TouchableWithoutFeedback onPress={tapBackground}>
        <BlurView
          tint="default"
          intensity={100}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </TouchableWithoutFeedback>

      <ModalLogin.AnimatedModal
        style={{
          transform: [{ scale }, { translateY }],
        }}
      >
        <ModalLogin.Logo source={require("../../assets/logo-dc.png")} />
        <ModalLogin.Text>Start Learning. Access Pro Content.</ModalLogin.Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(newEmail: string) => setEmail(newEmail)}
          onFocus={focusEmail}
          onBlur={blurEmail}
          value={email} // Not Needed
        />
        <ModalLogin.TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(newPassword: string) => setPassword(newPassword)}
          onFocus={focusPassword}
          onBlur={blurPassword}
          value={password} // Not Needed
        />
        <ModalLogin.IconEmail source={iconEmail} />
        <ModalLogin.IconPassword source={iconPassword} />
        <TouchableOpacity onPress={handleLogin}>
          <ButtonView>
            <ButtonText>Log in</ButtonText>
          </ButtonView>
        </TouchableOpacity>
      </ModalLogin.AnimatedModal>
      <Success isActive={isSuccessful} />
      <Loading isActive={isLoading} />
    </ModalLogin.AnimatedContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

ModalLogin.AnimatedContainer = AnimatedContainer;
ModalLogin.AnimatedModal = AnimatedModal;
ModalLogin.Logo = Logo;
ModalLogin.Text = Text;
ModalLogin.TextInput = TextInput;
ModalLogin.ButtonView = ButtonView;
ModalLogin.ButtonText = ButtonText;
ModalLogin.IconEmail = IconEmail;
ModalLogin.IconPassword = IconPassword;
