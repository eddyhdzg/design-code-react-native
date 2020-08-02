import React from "react";
import styled from "styled-components/native";
import {
  ProjectsScreenNavigationProp,
  ProjectsScreenRouteProp,
} from "../utils/types/index.types";

interface IProjectsScreen {
  navigation: ProjectsScreenNavigationProp;
  route: ProjectsScreenRouteProp;
}

const ProjectsScreen: React.FC<IProjectsScreen> = ({ navigation }) => {
  return (
    <Container>
      <Text>Projects Screen</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default ProjectsScreen;
