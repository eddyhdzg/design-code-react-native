import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

// const defaultAvatar =
//   "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg";

// const uinamesPath = "https://uinames.com/api/?ext&gender=female&region=japan";

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    avatar: state.avatar,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
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
};

interface Avatar {
  avatar: any;
  updateName: (name: string) => void;
  updateAvatar: (name: string) => void;
}

const Avatar: React.FC<Avatar> = ({ avatar, updateName, updateAvatar }) => {
  console.log(avatar);
  const loadState = () => {
    AsyncStorage.getItem("state").then((serializedState: any) => {
      const state = JSON.parse(serializedState);

      if (state) {
        updateName(state.name);
        updateAvatar(state.avatar);
      }
    });
  };

  useEffect(() => {
    // updateName("Eddy");
    loadState();
  }, []);
  return <Image source={{ uri: avatar }} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
