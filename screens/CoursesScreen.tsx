import React from "react";
import styled from "styled-components/native";
import {
  CoursesScreenNavigationProp,
  CoursesScreenRouteProp,
} from "../utils/types/index.types";

interface ICoursesScreen {
  navigation: CoursesScreenNavigationProp;
  route: CoursesScreenRouteProp;
}

const CoursesScreen: React.FC<ICoursesScreen> = ({ navigation }) => {
  return (
    <Container>
      <Text>Courses Screen</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default CoursesScreen;
