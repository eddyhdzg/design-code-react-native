import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  SectionScreenNavigationProp,
  SectionScreenRouteProp,
  section,
} from "../utils/types/index.types";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import Markdown from "react-native-showdown";
// import { WebView } from "react-native-webview";

interface ISectionScreen {
  navigation: SectionScreenNavigationProp;
  route: SectionScreenRouteProp;
}

const SectionScreen: React.FC<ISectionScreen> = ({ route, navigation }) => {
  // @ts-ignore
  const { params }: { params: { section: section } } = route || {};
  const { section } = params || {};

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);

    return () => {
      StatusBar.setBarStyle("dark-content", true);
    };
  }, [route]);

  return (
    <ScrollView>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={section?.image} />
          <Wrapper>
            <Logo source={section?.logo} />
            <Subtitle>{section?.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section?.title}</Title>
          <Caption>{section?.caption}</Caption>
        </Cover>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <CloseView>
            <Ionicons
              name="md-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {/* <WebView
          source={{ html: htmlStyles + section?.content }}
          scalesPageToFit={false}
          scrollEnabled={false}
          onShouldStartLoadWithRequest={({ url }) => {
            if (url.includes("https://github.com/eddyhdzg")) {
              Linking.openURL(url);
              return false;
            }
            return true;
          }}
        /> */}
          <Markdown
            markdown={section?.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </Container>
    </ScrollView>
  );
};

// const htmlContent = `
//   <h2>this is a title</h2>
//   <p>This <strong>is</strong> a <a href="https://github.com/eddyhdzg"> link </a> </p>
//   <img src="https://pbs.twimg.com/profile_images/1263350139504091137/9Td-sIYZ_400x400.jpg "/>
// `;

const htmlStyles = `
<style>
  * {
    font-family: -apple-system;
        margin: 0;
        padding: 0;
    font-size: 17px;
    font-weight: normal;
    color: #3c4560;
    line-height: 24px;
  }

  h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #b8bece;
    font-weight: 600;
    margin-top: 50px;
  }

    p {
      margin-top: 20px;
  }

  a {
    color: #4775f2;
    font-weight: 600;
    text-decoration: none;
  }

  strong {
    font-weight: 700;
  }

  img {
    width: 100%;
    margin-top: 20px;
      border-radius: 10px;
  }

</style>
`;

const Content = styled.View`
  height: 1000px;
  padding: 12px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

export default SectionScreen;
