import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

export const AnimatedContainer = Animated.createAnimatedComponent(Container);

export const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

export const AnimatedModal = Animated.createAnimatedComponent(Modal);

export const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

export const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

export const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

export const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;

export const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

export const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
